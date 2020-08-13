import React from 'react';
import '../Landing.scss';
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';

/**
 * Website NavBar.
 * This was designed as part of the landing page layout, but the navbar is displayed on various other pages.
 * The chatbot widget is attached to it, so when the navbar is visible, so is the chatbot.
 */
function NavBarLanding() {
    return (
        <React.Fragment>
            <div className="navBar">

                <div className={"kwiliTagNavBar"}>
                    <img className={"kwiliLogo"} src={KwiliLogo} alt={"logo de Kwili"} href='/' />
                    <a style={{ color: 'white' }} href='/'>KWILI</a>
                </div>

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
