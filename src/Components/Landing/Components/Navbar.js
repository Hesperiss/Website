import React from 'react';
import '../Landing.scss';
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';

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

                <a href='/chat'>
                    <input
                        type="submit"
                        value="Aidez-moi !"
                        href="/chat"
                        className="navBarButton"
                    />
                </a>
                <a href='/'>
                    <input
                        type="submit"
                        value="Qui sommes-nous ?"
                        href="/"
                        className="navBarButton"
                    />
                </a>
                <a href='/download'>
                    <input
                        type="submit"
                        value="Application"
                        href="/download"
                        className="navBarButton"
                    />
                </a>

                <ChatBotWidget fullscreen={false} />

            </div></React.Fragment>
    );
}
export default NavBarLanding;