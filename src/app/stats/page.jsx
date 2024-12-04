"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";

const commitData = [
	{ date: "2023-01", commits: 20 },
	{ date: "2023-02", commits: 35 },
	{ date: "2023-03", commits: 28 },
	{ date: "2023-04", commits: 45 },
	{ date: "2023-05", commits: 32 },
	{ date: "2023-06", commits: 55 },
];

const starData = [
	{ month: "Jan", stars: 10 },
	{ month: "Feb", stars: 25 },
	{ month: "Mar", stars: 45 },
	{ month: "Apr", stars: 70 },
	{ month: "May", stars: 95 },
	{ month: "Jun", stars: 120 },
];

const issueData = [
	{ name: "Bugs", value: 30 },
	{ name: "Features", value: 45 },
	{ name: "Questions", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function RepositoryPerformanceMetrics() {
	return (
		<div className="m-4 grid gap-5 md:grid-cols-2 lg:grid-cols-1">
			<Card>
				<CardHeader>
					<CardTitle>Commits Over Time</CardTitle>
					<CardDescription>Number of commits per month</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={commitData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="commits"
									stroke="#8884d8"
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Stars Growth</CardTitle>
					<CardDescription>Cumulative stars over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={starData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="month" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="stars" fill="#82ca9d" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Issue Breakdown</CardTitle>
					<CardDescription>Distribution of issue types</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={issueData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{issueData.map((entry, index) => (
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
