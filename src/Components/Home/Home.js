import React from 'react';
import './home.scss'
import {FaCommentMedical, FaMapMarkedAlt} from "react-icons/all";
import {Button} from 'react-bootstrap'
import {Link} from "react-router-dom";



export default class HomePage extends React.Component {
    descBoxes = [
        {
            title: "Chat en ligne",
            text: "Ce chat entre l'urgentiste et le patient, permet d'être pris en charge avant même d'être physiquement à l'hôpital.",
            icon: <FaCommentMedical className ="icon"/>,
            path: "/chat",
        },
        {
            title: "Carte des hopitaux",
            text: "Grace à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations en temps réel.",
            icon: <FaMapMarkedAlt className ="icon"/>,
            path: "/map",
        },
    ];


    descriptionBox(title, text, icon, path) {

        return (
            <Button className="descBox" href={path}>
                <div className="rhombus">
                    <div className="rhombusContents">
                        {icon}
                    </div>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
            </Button>
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
                    {this.descriptionBox(this.descBoxes[0].title, this.descBoxes[0].text, this.descBoxes[0].icon, this.descBoxes[0].path)}
                    {this.descriptionBox(this.descBoxes[1].title, this.descBoxes[1].text, this.descBoxes[1].icon, this.descBoxes[1].path)}
                </div>
            </div>

        );

    }
    render() {
        return (
            <div>
                {this.displayFeaturesDescriptionBoxes()}
                <div className={"introText"}>
                    <Link to="/">
                        <button>En savoir plus</button>
                    </Link>
                </div>
            </div>
        );
    }
}
