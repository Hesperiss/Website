import React from 'react';
import {Helmet} from "react-helmet";
import { FormattedMessage } from 'react-intl';

import NavBar from "./Components/Navbar";
import FeaturesDescription from "./Components/FeaturesDescription";
import PreviewSection from "./Components/PreviewSection";
import ContactForm from "./Components/ContactForm";
import phoneDemo from "../../Images/phone_section1.png";
import { FaArrowDown } from "react-icons/fa";


/**
 * Il s'agit du composant principal de la Landing page.
 * Pour plus de clarté, les différentes sections de l'agencement de landing page sont réparties dans plusieurs fichiers :
 * ContactForm, FeaturesDescription, Navbar and PreviewSection
 * L'effet visuel de vague bleue est produit avec un élément svg en html.
 * @see {@link https://smooth.ie/blogs/news/svg-wavey-transitions-between-sections générateur d'élements html svg }
 */
class LandingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: null,
		};
	}

	/**
	 * Glisse vers le lien interne vers la section "en savoir plus' de la page.
	 */
	slideToAnchorLink() {
		let scrollTo = document.getElementById('#knowMore');
		scrollTo.scrollIntoView();
	};

	/**
	 * Affichage de la page d'accueil
	 */
	render() {

		return (
			<div className={"root"}>

      <Helmet>
        <meta name="description" content="Découvrez Kwili, un moyen simple et rapide pour accéder aux urgences. Une première prise en charge en ligne." />
        <meta name="robots" content="index, follow" />
      </Helmet>

				<NavBar />

				<div className={"sectionWrapper"}>
					<div className={"introSection"}>
						<img src={phoneDemo} alt={"kwili webApp demo"} />
						<div className={"introText"}>
							<h1>KWILI</h1>
							<p>
								<FormattedMessage
									id="Landing.Tagline"
									defaultMessage="Un moyen simple et rapide pour accéder aux urgences.{code}Une première prise en charge en ligne."
									values={{ code: <br/> }}
								/>
							</p>
							<button onClick={() => this.slideToAnchorLink()}>
								<FormattedMessage
									id="Landing.Scroll"
									defaultMessage="Aperçu"
								/>
								<FaArrowDown />
							</button>
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
