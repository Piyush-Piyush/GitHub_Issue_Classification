"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Spinner = () => (
	<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
			fill="none"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
);

async function getIssues(repoName, setLoading, setIssues, setError) {
	try {
		const response = await fetch("/api/fetchIssues", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ repoName }),
		});
		const data = await response.json();

		if (response.ok && Array.isArray(data)) {
			setIssues(data);
		} else {
			setError(data.message || "An error occurred while fetching issues.");
		}
	} catch (error) {
		console.error("Error fetching issues:", error);
		setError("Failed to fetch issues. Please try again.");
	} finally {
		setLoading(false);
	}
}

export default function RepositoryPerformanceMetrics() {
	const pathname = usePathname();

	// Extract `repoName` from the URL path
	const repoName = pathname.split("/").pop();

	const [issueData, setIssueData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (repoName) {
			getIssues(repoName, setIsLoading, setIssueData, setError);
		} else {
			setError("Repository name is missing in the URL.");
			setIsLoading(false);
		}
	}, [repoName]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spinner />
				<span>Loading issues...</span>
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					{error}
					{repoName && (
						<button
							onClick={() =>
								getIssues(
									repoName,
									setIsLoading,
									setIssueData,
									setError
								)
							}
							className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
						>
							Try Again
						</button>
					)}
				</AlertDescription>
			</Alert>
		);
	}

	if (!Array.isArray(issueData) || issueData.length === 0) {
		return (
			<Alert>
				<AlertTitle>No Issues Found</AlertTitle>
				<AlertDescription>
					There are no issues with labels for the repository.
				</AlertDescription>
			</Alert>
		);
	}

	const labelCounts = issueData.reduce((acc, issue) => {
		const label = issue.labels[0];
		acc[label] = (acc[label] || 0) + 1;
		return acc;
	}, {});

	const chartData = Object.entries(labelCounts).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<div className="m-4 grid gap-5 md:grid-cols-2 lg:grid-cols-1">
			<Card>
				<CardHeader>
					<CardTitle>Issue Label Breakdown</CardTitle>
					<CardDescription>
						Distribution of issue labels for {repoName}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[230px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={chartData}
									cx="50%"
									cy="50%"
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
