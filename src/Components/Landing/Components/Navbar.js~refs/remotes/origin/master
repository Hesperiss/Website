import React from 'react';
import '../Landing.scss';
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';
import { toggleWidget } from 'react-chat-widget';
import { FormattedMessage } from 'react-intl';

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

                <FormattedMessage id="Navbar.Chat" defaultMessage="Chat en ligne">
                    { placeholder => 
                        <input
                            type="button"
                            value={placeholder}
                            href=""
                            border="none"
                            onClick={toggleWidget}
                            className="navBarButton"
                        />
                    }
                </FormattedMessage>

                <a href='/map'>
                    <FormattedMessage id="Navbar.Hospitals" defaultMessage="Carte des hôpitaux">
                        { placeholder => 
                            <input
                                type="submit"
                                value={placeholder}
                                href="/map"
                                className="navBarButton"
                            />
                        }
                    </FormattedMessage>
                </a>

                <a href='/landing'>
                    <FormattedMessage id="Navbar.Landing" defaultMessage="Qui sommes-nous ?">
                        { placeholder => 
                            <input
                                type="submit"
                                value={placeholder}
                                href="/landing"
                                className="navBarButton"
                            />
                        }
                    </FormattedMessage>
                </a>

                <a href="https://play.google.com/store/apps/details?id=fr.kwili.kwili" target="_blank" rel="noopener noreferrer">
                    <FormattedMessage id="Navbar.App" defaultMessage="Application">
                        { placeholder => 
                            <input
                                type="submit"
                                value={placeholder}
                                href="https://play.google.com/store/apps/details?id=fr.kwili.kwili"
                                className="navBarButton"
                            />
                        }
                    </FormattedMessage>
                </a>

                <ChatBotWidget fullscreen={false} />

            </div></React.Fragment>
    );
}
export default NavBarLanding;
