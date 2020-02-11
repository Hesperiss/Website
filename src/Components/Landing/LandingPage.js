import React from 'react';
import { navbarLanding } from './NavbarLanding/NavbarLanding';
import { displayParallax } from './Parallax/Parallax';
import './Fonts.css';

class LandingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: null,
		};
	}


	render () {

		return (
			<div>
				{navbarLanding()}
				{displayParallax()}
			</div>
		);
	}

}

export default LandingPage;
