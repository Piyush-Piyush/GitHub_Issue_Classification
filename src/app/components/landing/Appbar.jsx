"use client";
import Link from "next/link";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Appbar() {
	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const { data: session } = useSession();
	const router = useRouter();
	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/");
	};

	return (
		<header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<Link href="/">
							<span className="sr-only">GitClassify</span>
							<Github className="h-8 w-auto sm:h-10" />
						</Link>
					</div>
					<nav className="hidden md:flex space-x-10">
						<button
							onClick={() => scrollToSection("home")}
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Home
						</button>
						<button
							onClick={() => scrollToSection("how-it-works")}
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							How It Works
						</button>
						<button
							onClick={() => scrollToSection("features")}
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Features
						</button>
						<button
							onClick={() => scrollToSection("benefits")}
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Benefits
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Contact
						</button>
					</nav>
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						{session?.user ? (
							<div className=" flex flex-col items-center gap-5 md:flex-row">
								<span className="text-blue-100">
									Hi, {session.user.name}
								</span>
								<Button
									className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30"
									onClick={handleSignOut}
								>
									Logout
								</Button>
							</div>
						) : (
							<Button
								className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30"
								onClick={() => signIn()}
							>
								Sign In
							</Button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
