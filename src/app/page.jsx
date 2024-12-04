import Appbar from "./components/Appbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Redirect from "./components/Redirect";
export default function LandingPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Appbar />
			<Redirect/>
			<main className="flex-grow">
				<section id="home">
					<Hero />
				</section>
				<section id="how-it-works">
					<HowItWorks />
				</section>
				<section id="features">
					<Features />
				</section>
				<section id="benefits">
					<Benefits />
				</section>
				<section id="contact">
					{/* Add a Contact component here if needed */}
				</section>
			</main>
			<Footer />
		</div>
	);
}
