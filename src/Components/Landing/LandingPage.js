import React from 'react';
import NavBar from "./Components/Navbar";
import BlueCurve from "./Images/blue_curve.svg"

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
				<img src={BlueCurve} alt={"blue background"} className={"blueCurve"}/>
			</div>
		);
	}

}

export default LandingPage;
