import React from 'react';
import '../Landing.scss';
import {FaCommentMedical, FaMapMarkedAlt, FaUserLock} from "react-icons/all";

/**
 * Contenu des carrés détaillant les fonctionnalités de Kwili.
 * @type {{icon: *, text: string, title: string}}
 */
const descBoxes = [
{
    title: "Chat en ligne",
    text: "Ce chat entre l'urgentiste et le patient, permet d'être pris en charge avant même d'être physiquement à l'hôpital.",
    icon: <FaCommentMedical className ="icon"/>,
},
{
    title: "Géolocalisation",
    text: "Grace à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations en temps réel.",
    icon: <FaMapMarkedAlt className ="icon"/>,
},
{
    title: "Mode invité",
    text: "Notre service ne requiert pas de connexion, assurant que vos données personnelles et médicales ne soient pas enregistrées et simplifiant l'utilisation.",
    icon : <FaUserLock className="icon"/>,
}
];

/**
 * Construit les carrés contenant la description des fonctionnalités principales de Kwili.
 * @param {string} title titre
 * @param {string} text description d'une fonctionnalité
 * @param {Object} icon
 */
function descriptionBox(title, text, icon) {

    return (
        <div className="descBox">
            <div className="rhombus">
                <div className="rhombusContents">
                    {icon}
                </div>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

/**
 * Fait partie de l'affichage de la page d'accueil.
 * Affiche des carrés contenant la description des fonctionnalités principales de Kwili.
 * @returns {React.Fragment}
 */
function displayFeaturesDescriptionBoxes() {

    return (

        <div className="descriptionSection">

            <div className={"textWrapper"}>
                <h2 className={"sectionTitle"}>Notre vision</h2>
                <p className={"sectionSubtitle"}>Jamais aller aux urgences n'aura été aussi simple !</p>
            </div>

            <div className={"descBoxWrapper"}>
                {descriptionBox(descBoxes[0].title, descBoxes[0].text, descBoxes[0].icon)}
                {descriptionBox(descBoxes[1].title, descBoxes[1].text, descBoxes[1].icon)}
                {descriptionBox(descBoxes[2].title, descBoxes[2].text, descBoxes[2].icon)}
            </div>
        </div>

    );

}

export default displayFeaturesDescriptionBoxes;
