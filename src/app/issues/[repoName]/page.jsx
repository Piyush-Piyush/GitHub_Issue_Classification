"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

// Use the async function for fetching issues
async function getIssues(repoName, setLoading, setIssues) {
	try {
		const response = await fetch("/api/fetchIssues", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				repoName: repoName,
			}),
		});
		const data = await response.json();
		setIssues(data);
	} catch (error) {
		console.log("Error fetching repositories:", error);
	} finally {
		setLoading(false);
	}
}

const ITEMS_PER_PAGE = 5;

const truncateDescription = (description, maxLength = 250) => {
	if (!description) return "No description provided.";
	if (description.length <= maxLength) return description;
	return description.slice(0, maxLength).trim() + "...";
};

export default function RepositoryIssues() {
	const pathname = usePathname();
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [repositoryName, setRepositoryName] = useState("");

	// Extract repoName from the pathname
	const repoName = pathname.split("/").pop();

	useEffect(() => {
		if (repoName) {
			setRepositoryName(repoName);
		}
	}, [repoName]);

	// Fetch issues when repositoryName changes
	useEffect(() => {
		if (repositoryName) {
			setLoading(true);
			getIssues(repositoryName, setLoading, setIssues);
		}
	}, [repositoryName]);

	// Filter issues by category
	const filterIssues = (category) => {
		if (category === "all") return issues;
		const labelMap = {
			bugs: "bug",
			features: "feature",
			questions: "question",
		};
		return issues.filter((issue) =>
			issue.labels.some(
				(label) => label.toLowerCase() === labelMap[category]
			)
		);
	};

	const filteredIssues = filterIssues(activeTab);
	const totalPages = Math.ceil((filteredIssues?.length || 0) / ITEMS_PER_PAGE);
	const paginatedIssues = Array.isArray(filteredIssues)
		? filteredIssues.slice(
				(currentPage - 1) * ITEMS_PER_PAGE,
				currentPage * ITEMS_PER_PAGE
		  )
		: [];

	// Function to get category icon
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

	// If loading, show skeleton
	if (loading) {
		return (
			<div className="w-full flex h-screen bg-gray-50">
				<div className="h-full w-full">
					<header className="bg-white shadow px-4 py-6">
						<Skeleton className="h-8 w-3/4" />
					</header>
					<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<Skeleton className="h-10 w-full mb-4" />
						{[1, 2, 3].map((i) => (
							<Card key={i} className="mb-4 border-indigo-200">
								<CardHeader>
									<Skeleton className="h-6 w-3/4" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-4 w-1/2 mb-2" />
									<Skeleton className="h-4 w-1/4" />
								</CardContent>
								<CardFooter>
									<Skeleton className="h-6 w-16" />
								</CardFooter>
							</Card>
						))}
					</main>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex h-screen bg-gray-50">
			<div className="h-full w-full">
				<header className="bg-white shadow px-4 py-6">
					<h1 className="text-3xl font-bold text-gray-900">
						Issues for Repository:{" "}
						<span className="text-indigo-600">{repositoryName}</span>
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
											<CardTitle className="flex items-center text-indigo-700 ">
												{getCategoryIcon(category)}
												<span className="ml-2">{issue.title}</span>
												<a
													href={issue.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<SquareArrowOutUpRight className="ml-2 h-5 w-5 text-indigo-600" />
												</a>
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
											<p className="mt-2 text-sm text-gray-600">
												{truncateDescription(
													issue.description ||
														"No description provided."
												)}
											</p>
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
