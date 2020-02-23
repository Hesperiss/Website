import React from 'react';
import NavBar from "./Components/Navbar";
import BlueCurve from "./Images/blue_curve.svg"
import background from "./Images/Background.png"
import phoneDemo from "./Images/phone_section1.png"

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

				<div className={"introSection"}>
					<img src={phoneDemo} alt={"kwili webApp demo"}/>
					<div className={"introText"}>
						<h1>KWILI</h1>
						<p>Un moyen simple et rapide pour accéder aux urgences.<br/>
						Une première prise en charge en ligne.</p>
						<input type="submit" value="En savoir plus"/>
					</div>
				</div>

				<img src={background} alt={"doctor office"} className={"background"}/>
				<img src={BlueCurve} alt={"blue background"} className={"blueCurve"}/>
			</div>
		);
	}

}

export default LandingPage;
