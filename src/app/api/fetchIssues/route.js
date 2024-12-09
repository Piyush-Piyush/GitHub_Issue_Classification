import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
	try {
		const token = await getToken({
			req,
			secret: process.env.JWT_SECRET ?? "",
		});
		if (!token || !token.accessToken) {
			return NextResponse.json(
				{ message: "Not logged in or access token not found" },
				{ status: 401 }
			);
		}

		const body = await req.json();
		const { repoName } = body;
		if (!repoName) {
			return NextResponse.json(
				{ message: "Repository name is required" },
				{ status: 400 }
			);
		}

		const username = token.username || "";
		const repoIssueUrl = `https://api.github.com/repos/${username}/${repoName}/issues`;

		const response = await fetch(repoIssueUrl, {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{ message: `GitHub API error: ${errorData.message}` },
				{ status: response.status }
			);
		}

		const issuesData = await response.json();
		const extractedIssues = issuesData.map((issue) => ({
			id: issue.id,
			title: issue.title,
			created_at: issue.created_at,
			state: issue.state,
            url: issue.html_url,
			labels: issue.labels ? issue.labels.map((label) => label.name) : [],
		}));

		return NextResponse.json(extractedIssues);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error while fetching issues: " + error.message },
			{ status: 500 }
		);
	}
}
