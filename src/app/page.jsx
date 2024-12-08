import Appbar from "./components/landing/Appbar";
import Hero from "./components/landing/Hero";
import HowItWorks from "./components/landing/HowItWorks";
import Features from "./components/landing/Features";
import Benefits from "./components/landing/Benefits";
import Footer from "./components/landing/Footer";
import Redirect from "./components/landing/Redirect";
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
