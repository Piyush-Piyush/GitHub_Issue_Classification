import { Clock, CheckCircle, Users } from "lucide-react";

const benefits = [
	{
		name: "Time-Saving",
		description:
			"Automates the process of categorizing issues to speed up project management.",
		icon: Clock,
	},
	{
		name: "Enhanced Accuracy",
		description:
			"Utilize machine learning models to reduce human error and misclassification.",
		icon: CheckCircle,
	},
	{
		name: "Improved Team Collaboration",
		description:
			"Keep your team organized with clear categorizations and quick access to important issues.",
		icon: Users,
	},
];

export default function Benefits() {
	return (
		<div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Benefits
					</h2>
					<p className="mt-4 text-xl text-gray-600">
						Why our solution makes a difference
					</p>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{benefits.map((benefit) => (
							<div key={benefit.name} className="pt-6">
								<div className="flow-root bg-white rounded-lg px-6 pb-8">
									<div className="-mt-6">
										<div>
											<span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
												<benefit.icon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</span>
										</div>
										<h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
											{benefit.name}
										</h3>
										<p className="mt-5 text-base text-gray-500">
											{benefit.description}
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
