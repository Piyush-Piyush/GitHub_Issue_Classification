import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET ?? "" });
	if (!token || !token.accessToken) {
		return NextResponse.json(
			{ message: "Not logged in or no access token" },
			{ status: 401 }
		);
	}

	try {
		const response = await fetch("https://api.github.com/user/repos", {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch repositories");
		}

		const repoData = await response.json();
		const extractedData = repoData.map((repo) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description || "No description",
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			owner : repo.owner,
		}));


		return NextResponse.json(extractedData);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error while fetching repositories: " + error.message },
			{ status: 500 }
		);
	}
}
