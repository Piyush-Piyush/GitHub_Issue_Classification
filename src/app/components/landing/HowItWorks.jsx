import {
	LogIn,
	GitPullRequest,
	Brain,
	LayoutDashboard,
	Filter,
} from "lucide-react";

const steps = [
	{
		name: "Login/Signup",
		description: "Connect your GitHub repositories",
		icon: LogIn,
	},
	{
		name: "Fetch Issues",
		description: "Using the GitHub API",
		icon: GitPullRequest,
	},
	{
		name: "AI Classification",
		description: "Using machine learning models",
		icon: Brain,
	},
	{
		name: "View Results",
		description: "In an organized dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Manage Issues",
		description: "With interactive filters and sorting",
		icon: Filter,
	},
];

export default function HowItWorks() {
	return (
		<div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						How It Works
					</h2>
					<p className="mt-4 text-xl text-gray-600">
						Simplify your GitHub issue management in just a few steps
					</p>
				</div>

				<div className="mt-16">
					<div className="flex flex-col md:flex-row justify-around items-start md:items-center">
						{steps.map((step, index) => (
							<div
								key={step.name}
								className="flex flex-col items-center text-center mb-8 md:mb-0"
							>
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
									<step.icon className="h-8 w-8" />
								</div>
								<h3 className="text-lg font-medium text-gray-900">
									{step.name}
								</h3>
								<p className="mt-2 text-sm text-gray-500">
									{step.description}
								</p>
								{index < steps.length - 1 && (
									<div className="hidden md:block h-0.5 w-16 bg-gray-300 absolute left-1/2 transform -translate-x-1/2 mt-8" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
