import React from 'react';
import '../Landing.scss';
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';
import {toggleWidget} from 'react-chat-widget';
import {Link} from "react-router-dom";
import matchPath from "react-router/modules/matchPath";
import {useLocation} from "react-router";
import {FormattedMessage} from "react-intl";

/**
 * Barre de navigation du site Kwili.
 * Créée comme un élément de la page d'accueil, elle est cependant affiché sur la plupart des pages.
 * Le widget du chatbot y est attaché, et est donc accessible sur toutes les pages où la barre de navigation est présente.
 *
 * @Class Navbar
 */
function NavBarLanding() {

    const location = useLocation();
    const activePage = matchPath(location.pathname, "/landing")
        ? "landing" : matchPath(location.pathname, "/map")
        ? "map" : undefined;

    return (
        <React.Fragment>
            <div className="navBar">

                <div className={"kwiliTagNavBar"}>
                    <Link to={"/"} style={{color: 'white'}}>
                        <img className={"kwiliLogo"} src={KwiliLogo} alt={"logo de Kwili"}/>
                        KWILI
                    </Link>
                </div>

                <button onClick={toggleWidget} className={"navBarButton"}>
                    <FormattedMessage
                        id={"Navbar.Chat"}
                        defaultMessage={"Chat en ligne"}
                    />
                </button>

                <Link to={"/map"}>
                    <button className={activePage === "map" ? "activeNavBarButton" : "navBarButton"}>
                        <FormattedMessage
                            id={"Navbar.Hospitals"}
                            defaultMessage={"Carte des hôpitaux"}
                        />
                    </button>
                </Link>

                <Link to={'/landing'}>
                    <button className={activePage === "landing" ? "activeNavBarButton" : "navBarButton"}>
                        <FormattedMessage
                            id={"Navbar.Landing"}
                            defaultMessage={"Qui sommes-nous ?"}
                        />
                    </button>
                </Link>
                <a href={"https://play.google.com/store/apps/details?id=fr.kwili.kwili"} target={"_blank"}
                   rel={"noopener noreferrer"}>
                    <button className={"navBarButton"}>
                        <FormattedMessage
                            id={"Navbar.App"}
                            defaultMessage={"Application"}
                        />
                    </button>
                </a>

                <ChatBotWidget fullscreen={false}/>

            </div>
        </React.Fragment>
    );
}

export default NavBarLanding;
