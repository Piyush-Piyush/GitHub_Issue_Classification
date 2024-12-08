import { Github, Brain, LayoutDashboard, Scale, Users, ChartNoAxesCombined } from "lucide-react";

const features = [
	{
		name: "GitHub Integration",
		description: "Seamlessly fetch issues from repositories.",
		icon: Github,
	},
	{
		name: "AI Classification",
		description:
			"Use machine learning models to automatically categorize issues.",
		icon: Brain,
	},
	{
		name: "Customizable Dashboards",
		description:
			"Visualize issues in a categorized, easily navigable manner.",
		icon: LayoutDashboard,
	},
	{
		name: "Scalable",
		description:
			"Handle repositories of all sizes efficiently with multi-model support.",
		icon: Scale,
	},
	{
		name: "Collaborative Features",
		description: "Enable teams to better manage and track issues.",
		icon: Users,
	},
	{
		name: "Statistics",
		description: "Get a detailed overview of your repository's performance and metrics.",
		icon: ChartNoAxesCombined
	}
];

export default function Features() {
	return (
		<div className="bg-white py-12 sm:py-16 lg:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Features
					</h2>
					<p className="mt-4 text-xl text-gray-600">
						Powerful tools to streamline your GitHub issue management
					</p>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.name} className="pt-6">
								<div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
									<div className="-mt-6">
										<div>
											<span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
												<feature.icon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</span>
										</div>
										<h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
											{feature.name}
										</h3>
										<p className="mt-5 text-base text-gray-500">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
