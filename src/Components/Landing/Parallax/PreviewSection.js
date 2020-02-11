import React from 'react';
import appDemoGif from "../../../Images/android_demo.gif";
import "./PreviewSection.scss";

 export function displayPreviewSection() {

 	return (
		<div className="PreviewSection">
			<h3 className="sectionTitle">Aperçu</h3>
			<p>Kwili, concrètement, à quoi ça ressemble ?</p>

			<div className="previewContainer">

				<div className="previewPic">
					<img src={appDemoGif} alt="Android Demo" />
				</div>

				<div className="previewText">
					<h4>Une app mobile</h4>
					<div><p>Creéz un profil patient ou urgentiste.
					Chattez en ligne directement avec l'urgentiste, accédez à notre carte des hôpitaux et bénificiez de notre itinéraire adapté. Le tout grâce à une seule
					 et même application, disponible à la fois sur Android et iOS.</p></div>

					<h4>Un site web en complément</h4>
					<div><p>Retrouvez pratiquement toutes les fonctionnalités de l'application mobile
					sur notre plateforme web, accessible partout et depuis n'importe quel appareil, en utilisant
					le même compte que sur l'application mobile.</p></div>
				</div>
			</div>
		</div>
	);
}
