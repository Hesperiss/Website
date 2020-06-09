import React from 'react';
import './home.scss'
import {FaCommentMedical, FaMapMarkedAlt} from "react-icons/all";
import {Button} from 'react-bootstrap'

import ChatBotWidget from '../Chat/ChatBotWidget';
import { toggleWidget } from 'react-chat-widget';


export default class HomePage extends React.Component {

    displayFeaturesDescriptionBoxes() {

        return (

            <div className="homePageContents">

                <div className={"textWrapper"}>
                    <h1>Kwili</h1>
                    <h2>Jamais aller aux urgences n'aura été aussi simple !</h2>
                </div>

                <div className={"descBoxWrapper"}>
                    <Button className="descBox" id="chat" href={""} onClick={toggleWidget}>
                        <div className="rhombus">
                            <div className="rhombusContents">
                                <FaCommentMedical className ="icon"/>
                            </div>
                        </div>
                        <h3>Chat en ligne</h3>
                        <p>Rentrez en contact avec notre CHATBOT, il vous prendra en charge avant même d'être physiquement à l'hôpital.</p>
                    </Button>
                    <div id={"docImage"}> </div>

                    <Button className="descBox" id="map" href={"/map"}>
                    <div className="rhombus">
                        <div className="rhombusContents">
                            <FaMapMarkedAlt className ="icon"/>
                        </div>
                    </div>
                    <h3>Carte des hôpitaux</h3>
                    <p>Grâce à notre carte des hopitaux, nous vous trouvons automatiquement le meilleur itinéraire pour l'hôpital le plus proche, tout en bénéfiçiant d'informations en temps réel.</p>
                </Button>
                </div>

                <a href="/landing" className={"landingLink"}>
                    <h3>En savoir plus</h3>
                </a>


            </div>

        );

    }
    render() {
        return (
            <div className={"root"}>
            <div className={"homePage"}>
                <div className={"blueCurveWrapper"} >
                    <svg viewBox="0 0 500 150" className={"blueCurve"} preserveAspectRatio="none">
                        <path d="M-14.39,19.23 C172.40,147.53 320.26,189.95 509.87,12.33 L500.00,0.00 L0.00,0.00 Z"></path>
                    </svg>
                </div>
                {this.displayFeaturesDescriptionBoxes()}

                <ChatBotWidget fullscreen={false} />
            </div>
            </div>

        );
    }
}
