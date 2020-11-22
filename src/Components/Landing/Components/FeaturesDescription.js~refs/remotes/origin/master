import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../Landing.scss';
import {FaCommentMedical, FaMapMarkedAlt, FaUserLock} from "react-icons/all";

/**
 * Contenu des carrés détaillant les fonctionnalités de Kwili.
 * @type {{icon: *, text: string, title: string}}
 */
const descBoxes = [
{
    title: <FormattedMessage id="Features.ChatTitle" defaultMessage="Chat en ligne" />,
    text: <FormattedMessage id="Features.ChatText" defaultMessage="Rentrez en contact avec Emma, notre assistante virtuelle ! Elle vous conseillera sur votre situation et les mesures à prendre." />,
    icon: <FaCommentMedical className ="icon"/>,
},
{
    title: <FormattedMessage id="Features.GeolocTitle" defaultMessage="Géolocalisation" />,
    text: <FormattedMessage id="Features.GeolocText" defaultMessage="Grâce à notre carte, nous vous trouvons automatiquement les centres de soins les plus proches de chez vous. Du médecin à l’hôpital, en passant par la pharmacie ou le dentiste, votre itinéraire est calculé automatiquement à partir de votre mode de transport." />,
    icon: <FaMapMarkedAlt className ="icon"/>,
},
{
    title: <FormattedMessage id="Features.GuestTitle" defaultMessage="Mode invité" />,
    text: <FormattedMessage id="Features.GuestText" defaultMessage="Notre service ne requiert pas de connexion, assurant que vos données personnelles et médicales ne soient pas enregistrées et simplifiant l'utilisation." />,
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
                <h2 className={"sectionTitle"}>
                    <FormattedMessage id="Features.Title" defaultMessage="Notre vision" />
                </h2>
                <p className={"sectionSubtitle"}>
                    <FormattedMessage id="Features.Text" defaultMessage="Un accompagnement personnalisé pour vous conseiller dans votre urgence" />
                </p>
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
