import React from 'react';
import '../Landing.scss';
import {FaCommentMedical, FaMapMarkedAlt, FaUserLock} from "react-icons/all";
import {FormattedMessage} from "react-intl";

/**
 * Construit les carrés contenant la description des fonctionnalités principales de Kwili.
 * @param {string} title titre
 * @param {string} text description d'une fonctionnalité
 * @param {Object} icon
 */
function DescriptionBox(props) {

    return (
        <div className="descBox">
            <div className="rhombus">
                <div className="rhombusContents">
                    {props.icon}
                </div>
            </div>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    );
}

/**
 * Fait partie de l'affichage de la page d'accueil.
 * Affiche des carrés contenant la description des fonctionnalités principales de Kwili.
 * @returns {React.Fragment}
 */
export default function FeaturesDescriptionBoxes() {

    return (

        <div className="descriptionSection">

            <div className={"textWrapper"}>
                <h2 className={"sectionTitle"}>
                    <FormattedMessage
                        id={"Features.Title"}
                        defaultMessage={"Notre vision"}
                    />
                </h2>
                <p className={"sectionSubtitle"}>
                    <FormattedMessage
                        id={"Features.Text"}
                        defaultMessage={"Un accompagnement personnalisé pour vous conseiller dans votre urgence"}
                    />
                </p>
            </div>

            <div className={"descBoxWrapper"}>
                <DescriptionBox
                    title={<FormattedMessage id={"Features.ChatTitle"} defaultMessage={"Chat en ligne"}/>}
                    text={<FormattedMessage id={"Features.ChatText"} defaultMessage={"\"Rentrez en contact avec Emma, notre assistante virtuelle ! Elle vous conseillera sur votre situation et les mesures à prendre."}/> }
                    icon={<FaCommentMedical className="icon"/>}
                />
                <DescriptionBox
                    title={<FormattedMessage id={"Features.GeolocTitle"} defaultMessage={"Géolocalisation"}/>}
                    text={<FormattedMessage id={"Features.GeolocText"} defaultMessage={"Grâce à notre carte, nous vous trouvons automatiquement les centres de soins les plus proches de chez vous. u médecin à l’hôpital, en passant par la pharmacie ou le dentiste, votre itinéraire est calculé automatiquement à partir de votre mode de transport."}/>}
                    icon={<FaMapMarkedAlt className="icon"/>}
                />
                <DescriptionBox
                    title={<FormattedMessage id={"Features.GuestTitle"} defaultMessage={"Mode invité"}/>}
                    text={<FormattedMessage id={"Features.GuestText"} defaultMessage={"Notre service ne requiert pas de connexion, assurant que vos données personnelles et médicales ne soient pas enregistrées et simplifiant l'utilisation."}/>}
                    icon={<FaUserLock className="icon"/>}
                />
            </div>
        </div>
    );
}

