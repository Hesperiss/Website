import React from 'react';
import './home.scss'
import {FaCommentMedical, FaMapMarkedAlt} from "react-icons/all";
import {Helmet} from "react-helmet";
import ChatBotWidget from '../Chat/ChatBotWidget';
import {toggleWidget} from 'react-chat-widget';
import {Link} from "react-router-dom";


export default function HomePage() {

    const displayFeaturesDescriptionBoxes = () => {

        return (
            <div className="homePageContents">

                <div className={"textWrapper"}>
                    <h1>Kwili</h1>
                    <h2>Un accompagnement personnalisé pour vous conseiller dans votre urgence</h2>
                </div>

                <div className={"descBoxWrapper"}>
                    <div className="descBox" id="chat" onClick={toggleWidget}>
                        <div className="rhombus">
                            <div className="rhombusContents">
                                <FaCommentMedical className="icon"/>
                            </div>
                        </div>
                        <h3>Chat en ligne</h3>
                        <p>Rentrez en contact avec Emma, notre assistante virtuelle ! Elle vous conseillera sur votre
                            situation et
                            les mesures à prendre.</p>
                    </div>

                    <div id={"docImage"}/>

                    <Link to={"/map"} className={"descBox"} id={"map"}>
                        <div className="rhombus">
                            <div className="rhombusContents">
                                <FaMapMarkedAlt className="icon"/>
                            </div>
                        </div>
                        <h3>Carte des hôpitaux</h3>
                        <p>Notre service vous redirigera automatiquement vers les services de santé les plus proches
                            de chez
                            vous.</p>
                    </Link>
                </div>

                <Link to={"/landing"} className={"landingLink"}>
                    <h3>En savoir plus</h3>
                </Link>
            </div>

        );
    }

    return (
        <div className={"root"}>
            <Helmet>
                <meta name="description"
                      content="Jamais aller aux urgences n'aura été aussi simple ! Découvrez notre chat en ligne, ainsi que notre carte des hôpitaux qui faciliterons votre démarche."/>
                <meta name="robots" content="index, follow"/>
            </Helmet>
            <div className={"homePage"}>
                <div className={"blueCurveWrapper"}>
                    <svg viewBox="0 0 500 150" className={"blueCurve"} preserveAspectRatio="none">
                        <path
                            d="M-14.39,19.23 C172.40,147.53 320.26,189.95 509.87,12.33 L500.00,0.00 L0.00,0.00 Z"/>
                    </svg>
                </div>
                {displayFeaturesDescriptionBoxes()}

                <ChatBotWidget fullscreen={false}/>
            </div>
        </div>

    );

}
