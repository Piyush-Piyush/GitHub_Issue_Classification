"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";
import {
	Search,
	Star,
	GitFork,
	LogOut,
	User,
	LayoutDashboard,
} from "lucide-react";

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
	const username = "Piyush"; // This would typically come from your auth system

	const filteredRepositories = mockRepositories.filter((repo) =>
		repo.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<SidebarProvider>
			<div className="w-full flex h-screen">
				<Sidebar className="bg-indigo-700">
					<SidebarHeader>
						<CardTitle className="px-4 py-2 text-indigo-700">
							GitHub Issue Manager
						</CardTitle>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a
												href="#stats"
												className="text-indigo-700 hover:bg-indigo-600 hover:text-white"
											>
												<LayoutDashboard className="mr-2 h-4 w-4" />
												Stats
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a
												href="#profile"
												className="text-indigo-700 hover:bg-indigo-600 hover:text-white"
											>
												<User className="mr-2 h-4 w-4" />
												Profile
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a
												href="#logout"
												className="text-indigo-700 hover:bg-indigo-600 hover:text-white"
											>
												<LogOut className="mr-2 h-4 w-4" />
												Logout
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>

				<SidebarInset className="h-max w-full bg-gray-50">
					<header className="bg-white shadow">
						<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
							<h1 className="text-3xl font-bold text-gray-900">
								Welcome,{" "}
								<span className="text-indigo-600">{username}</span>
							</h1>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<SidebarTrigger className="text-indigo-600 hover:text-indigo-700" />
									</TooltipTrigger>
									<TooltipContent>Sidebar</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</header>

					<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="px-4 py-6 sm:px-0">
							<div className="mb-6">
								<Input
									type="text"
									placeholder="Search repositories..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									icon={<Search className="h-4 w-4 text-gray-400" />}
									className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{filteredRepositories.map((repo) => (
									<Card key={repo.id} className="border-indigo-100">
										<CardHeader>
											<CardTitle className="text-indigo-700">
												{repo.name}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500 mb-4">
												{repo.description}
											</p>
											<div className="flex justify-between text-sm text-gray-600">
												<span className="flex items-center">
													<Star className="h-4 w-4 mr-1 text-yellow-400" />
													{repo.stars}
												</span>
												<span className="flex items-center">
													<GitFork className="h-4 w-4 mr-1 text-indigo-400" />
													{repo.forks}
												</span>
											</div>
										</CardContent>
										<CardFooter>
											<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
												View Issues
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						</div>
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
