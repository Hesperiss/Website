import React from 'react';
import NavBar from "./Components/Navbar";
import FeaturesDescription from "./Components/FeaturesDescription";
import PreviewSection from "./Components/PreviewSection";
import ContactForm from "./Components/ContactForm";
import phoneDemo from "../../Images/phone_section1.png";

/**
 * This is the container component for the landing page.
 * For better readability, it is split in several sub-parts each corresponding to a separate visual and functional element on the page:
 * ContactForm, FeaturesDescription, Navbar and PreviewSection
 *
 * The blue wave visual effect is produced using a html svg element. If a similar visual effect needs to be created, this generator should be useful:
 * https://smooth.ie/blogs/news/svg-wavey-transitions-between-sections
 */
class LandingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: null,
		};
	}

	/**
	 * Accesses the anchor link of the “know more” section of the page using a visual sliding effect.
	 */
	slideToAnchorLink() {
		let scrollTo = document.getElementById('#knowMore');
		scrollTo.scrollIntoView();
	};

	/**
	 * Renders the navbar component.
	 */
	render() {

		return (
			<div className={"root"}>
				<NavBar />

				<div className={"sectionWrapper"}>
					<div className={"introSection"}>
						<img src={phoneDemo} alt={"kwili webApp demo"} />
						<div className={"introText"}>
							<h1>KWILI</h1>
							<p>Un moyen simple et rapide pour accéder aux urgences.<br />
								Une première prise en charge en ligne.</p>
							<input type="submit" value="En savoir plus" onClick={() => this.slideToAnchorLink()} />
						</div>
					</div>

					<div className={"blueCurveWrapper"} >
						<svg viewBox="0 0 500 150" className={"blueCurve"} preserveAspectRatio="none">
							<path d="M-92.83,-15.28 C328.72,179.11 425.22,145.55 507.62,22.20 L500.00,0.00 L27.93,-63.64 Z"></path>
						</svg>
					</div>

					<div className={"backgroundImage"}> </div>
				</div>

				<FeaturesDescription />
				<a href={"#knowMore"} id={"#knowMore"}> </a>
				<PreviewSection />
				<ContactForm />
			</div>
		);
	}

}

export default LandingPage;
