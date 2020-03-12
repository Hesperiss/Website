import React from 'react';
import '../Landing/Landing.scss'
import {FaCommentMedical, FaMapMarkedAlt, FaUserLock} from "react-icons/all";
import displayFeaturesDescriptionBoxes from "../Landing/Components/FeaturesDescription";



export default class HomePage extends React.Component {
    descBoxes = [
        {
            title: "Chat en ligne",
            text: "Ce chat entre l'urgentiste et le patient, permet d'être pris en charge avant même d'être physiquement à l'hôpital.",
            icon: <FaCommentMedical className ="icon"/>,
        },
        {
            title: "Carte des urgences",
            text: "Grace à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations en temps réel.",
            icon: <FaMapMarkedAlt className ="icon"/>,
        },
    ];


    descriptionBox(title, text, icon) {

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

    displayFeaturesDescriptionBoxes() {

        return (

            <div className="descriptionSection">

                <div className={"textWrapper"}>
                    <h2 className={"sectionTitle"}>Kwili</h2>
                    <p className={"sectionSubtitle"}>Jamais aller aux urgences n'aura été aussi simple !</p>
                </div>

                <div className={"descBoxWrapper"}>
                    {this.descriptionBox(this.descBoxes[0].title, this.descBoxes[0].text, this.descBoxes[0].icon)}
                    {this.descriptionBox(this.descBoxes[1].title, this.descBoxes[1].text, this.descBoxes[1].icon)}
                </div>
            </div>

        );

    }
    render() {
        return (
            <div>
                {this.displayFeaturesDescriptionBoxes()}
            </div>
        );
    }
}
