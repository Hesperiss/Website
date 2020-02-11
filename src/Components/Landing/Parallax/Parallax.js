import React from 'react';
import {
	FaMapMarkedAlt,
	FaComments,
 } from "react-icons/fa";
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { displayContactForm } from './ContactForm';
import { displayPreviewSection } from "./PreviewSection";
import doctorOfficePicture from '../../../Images/doctor_office.jpg';
import "./Parallax.scss";

const descBoxes = [
	{
		title: "Chat en ligne",
		text: "Ce chat entre l'urgentiste et le patient, permet d'être pris en charge avant même d'être physiquement à l'hôpital.",
		icon: <FaComments className ="icon"/>,
	},
	{
		title: " Géolocalisation",
		text: "Grace à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations exclusives en temps réel.",
		icon: <FaMapMarkedAlt className ="icon"/>,
	},
];


function descriptionBox(title, text, icon) {
	return (
		<div className="box">
			{icon}
			<h4>{title}</h4>
			<p>{text}</p>
		</div>

	)
}

export function displayParallax() {

	return (

		<div className="Parallax">

			<div className="MainPres" style={{ backgroundImage: `url(${doctorOfficePicture})`}}>
				<h1>KWILI</h1>
				<h3>Ma santé dans ma poche</h3>
				<AnchorLink href='#ourVisionSection' className="knowMore">
					En savoir plus
				</AnchorLink>
			</div>

			<span id='ourVisionSection'> </span>

			<h3 className="sectionTitle">Notre vision</h3>

			<p>Un moyen simple et rapide pour accéder aux urgences.</p>

			<div className="Description">
				{descriptionBox(descBoxes[0].title, descBoxes[0].text, descBoxes[0].icon)}
				{descriptionBox(descBoxes[1].title, descBoxes[1].text, descBoxes[1].icon)}
			</div>

			{displayPreviewSection()}

			<span id='previewSectionSpan'/>

			<span id='contactSectionSpan'/>

			{displayContactForm()}

		</div>

	);

}
