"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bug, Lightbulb, HelpCircle } from "lucide-react";

// Mock GitHub API response
const mockIssues = [
	{
		id: 1,
		title: "App crashes on startup",
		created_at: "2023-05-01",
		state: "open",
		labels: ["bug"],
	},
	{
		id: 2,
		title: "Add dark mode support",
		created_at: "2023-05-02",
		state: "open",
		labels: ["enhancement"],
	},
	{
		id: 3,
		title: "How to configure API keys?",
		created_at: "2023-05-03",
		state: "open",
		labels: ["question"],
	},
	{
		id: 4,
		title: "Improve error handling",
		created_at: "2023-05-04",
		state: "closed",
		labels: ["bug", "good first issue"],
	},
	{
		id: 5,
		title: "Implement user authentication",
		created_at: "2023-05-05",
		state: "open",
		labels: ["enhancement", "help wanted"],
	},
	{
		id: 6,
		title: "Best practices for state management?",
		created_at: "2023-05-06",
		state: "closed",
		labels: ["question"],
	},
];

const ITEMS_PER_PAGE = 5;

export default function RepositoryIssues({ params }) {
	const [issues, setIssues] = useState([]);
	const [activeTab, setActiveTab] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	// Unwrap params to get repoId using React.use()
	const { repoId } = React.use(params);

	useEffect(() => {
		// Replace mockIssues with a real API call if required
		console.log(`Fetching issues for repository ID: ${repoId}`);
		setIssues(mockIssues); // Mock issues for the repo
	}, [repoId]);

	const filterIssues = (category) => {
		if (category === "all") return issues;
		const labelMap = {
			bugs: "bug",
			features: "enhancement",
			questions: "question",
		};
		return issues.filter((issue) =>
			issue.labels.includes(labelMap[category])
		);
	};

	const filteredIssues = filterIssues(activeTab);
	const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);
	const paginatedIssues = filteredIssues.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const getCategoryIcon = (category) => {
		switch (category) {
			case "bugs":
				return <Bug className="w-4 h-4" />;
			case "features":
				return <Lightbulb className="w-4 h-4" />;
			case "questions":
				return <HelpCircle className="w-4 h-4" />;
			default:
				return <AlertCircle className="w-4 h-4" />;
		}
	};

	return (
		<div className="w-full flex h-screen bg-gray-50">
			<div className="h-full w-full">
				<header className="bg-white shadow px-4 py-6">
					<h1 className="text-3xl font-bold text-gray-900">
						Issues for Repository ID:{" "}
						<span className="text-indigo-600">{repoId}</span>
					</h1>
				</header>

				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-4 bg-indigo-100">
							<TabsTrigger
								value="all"
								className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
							>
								All
							</TabsTrigger>
							<TabsTrigger
								value="bugs"
								className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
							>
								Bugs
							</TabsTrigger>
							<TabsTrigger
								value="features"
								className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
							>
								Features
							</TabsTrigger>
							<TabsTrigger
								value="questions"
								className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
							>
								Questions
							</TabsTrigger>
						</TabsList>
						{["all", "bugs", "features", "questions"].map((category) => (
							<TabsContent key={category} value={category}>
								{paginatedIssues.map((issue) => (
									<Card
										key={issue.id}
										className="mb-4 border-indigo-200"
									>
										<CardHeader>
											<CardTitle className="flex items-center text-indigo-700">
												{getCategoryIcon(category)}
												<span className="ml-2">{issue.title}</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												Created on:{" "}
												{new Date(
													issue.created_at
												).toLocaleDateString()}
											</p>
											<div className="flex mt-2">
												{issue.labels.map((label) => (
													<Badge
														key={label}
														variant="secondary"
														className="mr-2 bg-indigo-100 text-indigo-800"
													>
														{label}
													</Badge>
												))}
											</div>
										</CardContent>
										<CardFooter>
											<Badge
												variant={
													issue.state === "open"
														? "default"
														: "secondary"
												}
												className={
													issue.state === "open"
														? "bg-green-100 text-green-800"
														: "bg-gray-100 text-gray-800"
												}
											>
												{issue.state}
											</Badge>
										</CardFooter>
									</Card>
								))}
							</TabsContent>
						))}
					</Tabs>

					<div className="flex justify-between items-center mt-6">
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setCurrentPage((prev) => Math.max(prev - 1, 1))
							}
							disabled={currentPage === 1}
							className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
						>
							Previous
						</Button>
						<span className="text-sm text-indigo-600">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
						>
							Next
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
}
