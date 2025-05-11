"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, GitFork, LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Fetch repositories by making api call from server
export async function getRepo(setLoading, setRepositories) {
	try {
		const response = await fetch("/api/fetchRepositories");
		const data = await response.json();
		setRepositories(data);
	} catch (error) {
		console.log("Error fetching repositories:", error);
	} finally {
		setLoading(false);
	}
}

export default function UserDashboard() {
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [repositories, setRepositories] = useState([]);
	const { data: session } = useSession();
	const username = session?.user?.name;
	const avatar = session?.user?.image;
	const router = useRouter();
	const [publicRepositoryName, setPublicRepositoryName] = useState("");

	useEffect(() => {
		getRepo(setLoading, setRepositories);
	}, []);

	const filteredRepositories = repositories.filter((repo) =>
		repo.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/");
	};

	const	handleSearchPublicRepo = async (e) => {
		e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/repositories?q=${encodeURIComponent(searchTerm)}`)
    }
	};

	if (loading) {
		return (
			<div className="w-full h-screen bg-gray-50 flex items-center justify-center">
				<div className="space-y-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex h-screen">
			<div className="h-full w-full bg-gray-50">
				<header className="bg-white shadow flex justify-between items-center px-4 py-6">
					<h1 className="flex text-3xl font-bold text-gray-900">
						<img
							src={avatar}
							alt="User-Avatar"
							className="h-10 w-10 rounded-full mr-4"
						/>
						Welcome,{" "}
						<span className="text-indigo-600 ml-2">{username}</span>
					</h1>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={handleSignOut}
									variant="ghost"
									className="text-indigo-600 hover:text-indigo-400"
								>
									<LogOut className="h-5 w-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Logout</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</header>

				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Search public repositories on GitHub to get started. */}
					<div className="m-5 border rounded-lg border-gray-200 p-6">
						<h1 className="text-2xl font-bold text-gray-900">
							Want to search public repositories
						</h1>
						<p className="mt-2 text-gray-500">
							Enter repository name to find public repositories, and get
							classified issues.
						</p>
						<form onSubmit={handleSearchPublicRepo} className="mt-4">
							<div className="flex items-center gap-4 flex-col sm:flex-row">
								<Input
									type="text"
									placeholder="Search repositories..."
									value={publicRepositoryName}
									onChange={(e) => setPublicRepositoryName(e.target.value)}
									className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
								/>
								<Button
									type="submit"
									className="w-full sm:w-1/3 bg-indigo-600 hover:bg-indigo-700 text-white"
								>
									Search
								</Button>
							</div>
						</form>
					</div>

					{/* Search Input */}
					<div className="m-6">
						<Input
							type="text"
							placeholder="Search repositories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					{/* Repository Cards */}
					<div className="m-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
						{filteredRepositories.map((repo) => (
							<div
								key={repo.id}
								className="border rounded-lg overflow-hidden bg-white shadow-md"
							>
								<div className="px-4 py-3 border-b">
									<h2 className="text-xl font-semibold text-indigo-700">
										{repo.name}
									</h2>
								</div>
								<div className="px-4 py-3">
									<p className="text-sm text-gray-500 mb-4">
										{repo.description}
									</p>
									<div className="px-4 py-2 flex justify-between text-sm text-gray-600">
										<span className="flex items-center">
											<Star className="h-4 w-4 mr-1 text-yellow-400" />
											{repo.stars}
										</span>
										<span className="flex items-center">
											<GitFork className="h-4 w-4 mr-1 text-indigo-400" />
											{repo.forks}
										</span>
									</div>
								</div>
								<div className="px-4 py-3 border-t">
									<Button
										className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-2"
										onClick={() =>
											router.push(`/issues/${repo.name}`)
										}
									>
										View Issues
									</Button>
									<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
										Stats
									</Button>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
