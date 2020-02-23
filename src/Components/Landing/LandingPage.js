import React from 'react';
import NavBar from "./Components/Navbar";
import FeaturesDescription from "./Components/FeaturesDescription";
import PreviewSection from "./Components/PreviewSection";
import ContactForm from "./Components/ContactForm"
import background from "../../Images/Background.png"
import phoneDemo from "../../Images/phone_section1.png"

class LandingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: null,
		};
	}


	render () {

		return (
			<div className={"root"}>
				<NavBar />

				<div className={"sectionWrapper"}>
					<div className={"introSection"}>
						<img src={phoneDemo} alt={"kwili webApp demo"}/>
						<div className={"introText"}>
							<h1>KWILI</h1>
							<p>Un moyen simple et rapide pour accéder aux urgences.<br/>
							Une première prise en charge en ligne.</p>
							<input type="submit" value="En savoir plus"/>
						</div>
					</div>

					<div className={"blueCurveWrapper"} >
						<svg viewBox="0 0 500 150" className={"blueCurve"} preserveAspectRatio="none">
							<path d="M-92.83,-15.28 C328.72,179.11 425.22,145.55 507.62,22.20 L500.00,0.00 L27.93,-63.64 Z"></path>
						</svg>
					</div>

					<div className={"backgroundImageWrapper"}>
						<img src={background} alt={"doctor office"} className={"backgroundImage"}/>
					</div>
				</div>

				<FeaturesDescription />
				<PreviewSection />
				<ContactForm />
			</div>
		);
	}

}

export default LandingPage;
