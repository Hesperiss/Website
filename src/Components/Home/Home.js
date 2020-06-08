import React from 'react';
import './home.scss'
import {FaCommentMedical, FaMapMarkedAlt} from "react-icons/all";
import {Button} from 'react-bootstrap'

import ChatBotWidget from '../Chat/ChatBotWidget';
import { toggleWidget } from 'react-chat-widget';


export default class HomePage extends React.Component {
    descBoxes = [
        {
            title: "Chat en ligne",
            text: "Rentrez en contact avec notre CHATBOT, il vous prendra en charge avant même d'être physiquement à l'hôpital.",
            icon: <FaCommentMedical className ="icon"/>,
            onClick: toggleWidget,
            id: "chat",
        },
        {
            title: "Carte des hopitaux",
            text: "Grace à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations en temps réel.",
            icon: <FaMapMarkedAlt className ="icon"/>,
            path: "/map",
            id: "map"
        },
    ];


    descriptionBox(title, text, icon, path, id, onClick) {

        return (
            <Button key={`${title}-key-${id}`}className="descBox" href={path || ""} id={id} onClick={onClick || function(){}}>
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
                    {this.descBoxes.map(entry => this.descriptionBox(entry.title, entry.text, entry.icon, entry.path, entry.id, entry.onClick))}
                </div>
            </div>

        );

    }
    render() {
        return (
            <div>
                {this.displayFeaturesDescriptionBoxes()}
                <div className={"introText"}>
                    <a href="/landing">
                        <button>En savoir plus</button>
                    </a>
                </div>
                <ChatBotWidget fullscreen={false} />
            </div>
        );
    }
}
