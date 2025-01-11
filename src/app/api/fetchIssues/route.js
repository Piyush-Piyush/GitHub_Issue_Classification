import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Function to fetch labeled issues from the FastAPI endpoint
async function fetchLabeledIssues(issuesData) {
	try {
		const apiUrl = "http://127.0.0.1:8000/predict";
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(issuesData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.log("Error while fetching labeled issues: " + error.message);
		throw error; // Propagate error for higher-level handling
	}
}

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

		// Fetch issues from the GitHub API
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

		// Extract the relevant issue data
		const issuesData = await response.json();
		const extractedIssues = issuesData.map((issue) => ({
			id: issue.id,
			title: issue.title,
			created_at: issue.created_at,
			state: issue.state,
			url: issue.html_url,
			description: issue.body,
			labels: issue.labels ? issue.labels.map((label) => label.name) : [],
		}));

		// Fetch labeled issues from FastAPI
		const labeledIssues = await fetchLabeledIssues(extractedIssues);
		// console.log("Labeled issues:", labeledIssues);
		return NextResponse.json(labeledIssues);
	} catch (error) {
		console.error("Error while fetching issues:", error.message);
		return NextResponse.json(
			{ message: "Error while fetching issues: " + error.message },
			{ status: 500 }
		);
	}
}
