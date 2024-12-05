"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileSearch, Star, GitFork, LogOut } from "lucide-react";

// Mock data for repositories
const mockRepositories = [
	{
		id: 1,
		name: "awesome-project",
		description: "A really cool project",
		stars: 120,
		forks: 35,
	},
	{
		id: 2,
		name: "react-component-library",
		description: "Reusable React components",
		stars: 89,
		forks: 12,
	},
	{
		id: 3,
		name: "node-api-boilerplate",
		description: "Starter for Node.js APIs",
		stars: 56,
		forks: 8,
	},
	{
		id: 4,
		name: "python-data-science",
		description: "Data science utilities",
		stars: 234,
		forks: 67,
	},
	{
		id: 5,
		name: "go-microservices",
		description: "Microservices in Go",
		stars: 78,
		forks: 23,
	},
	{
		id: 6,
		name: "vue-dashboard",
		description: "Admin dashboard template",
		stars: 45,
		forks: 7,
	},
];

export default function UserDashboard() {
	const [searchTerm, setSearchTerm] = useState("");

	const { data: session } = useSession();
	const username = session?.user?.name;

	// console.log(session);
	// console.log(username);
	const filteredRepositories = mockRepositories.filter((repo) =>
		repo.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/");
	};

	return (
		<div className="w-full flex h-screen">
			{/* Content */}
			<div className="h-full w-full bg-gray-50">
				<header className="bg-white shadow flex justify-between items-center px-4 py-6">
					<h1 className="text-3xl font-bold text-gray-900">
						Welcome, <span className="text-indigo-600">{username}</span>
					</h1>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={handleSignOut}
									className="bg-white size-max text-indigo-600 hover:text-indigo-400"
								>
									<LogOut className="h-5 w-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Logout</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</header>

				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Search Input */}
					<div className="m-6">
						<Input
							type="text"
							placeholder="Search repositories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							icon={<FileSearch />}
							className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					{/* Repository Cards */}
					<div className="m-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
									<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-2">
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
