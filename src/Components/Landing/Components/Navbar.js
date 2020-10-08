import React from 'react';
import '../Landing.scss';
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';
import { toggleWidget } from 'react-chat-widget';

/**
 * Barre de navigation du site Kwili.
 * Créée comme un élément de la page d'accueil, elle est cependant affiché sur la plupart des pages.
 * Le widget du chatbot y est attaché, et est donc accessible sur toutes les pages où la barre de navigation est présente.
 *
 * @Class Navbar
 */
function NavBarLanding() {
    return (
        <React.Fragment>
            <div className="navBar">

                <div className={"kwiliTagNavBar"}>
                    <img className={"kwiliLogo"} src={KwiliLogo} alt={"logo de Kwili"} href='/' />
                    <a style={{ color: 'white' }} href='/'>KWILI</a>
                </div>

                <input
                    type="button"
                    value="Chatbot"
                    href=""
                    border="none"
                    onClick={toggleWidget}
                    className="navBarButton"
                />

                <a href='/map'>
                    <input
                        type="submit"
                        value="Trouver des urgences"
                        href="/map"
                        className="navBarButton"

                    />
                </a>

                <a href='/landing'>
                    <input
                        type="submit"
                        value="Qui sommes-nous ?"
                        href="/landing"
                        className="navBarButton"
                    />
                </a>
                <a href="https://play.google.com/store/apps/details?id=fr.kwili.kwili" target="_blank" rel="noopener noreferrer">
                    <input
                        type="submit"
                        value="Application"
                        href="https://play.google.com/store/apps/details?id=fr.kwili.kwili"
                        className="navBarButton"
                    />
                </a>

                <ChatBotWidget fullscreen={false} />

            </div></React.Fragment>
    );
}
export default NavBarLanding;
