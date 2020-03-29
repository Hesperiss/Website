import React from 'react';
import '../Landing.scss';
import { Link } from 'react-router-dom'
import KwiliLogo from "../../../Images/logo_kwili.png"
import ChatBotWidget from '../../Chat/ChatBotWidget';

function NavBarLanding() {
    return (
        <React.Fragment>
        <div className="navBar">

            <div className={"kwiliTagNavBar"}>
                <Link to='/'>
                    <img className={"kwiliLogo"} src={KwiliLogo} alt={"logo de Kwili"} href='/'/>
                    <a style={{color: 'white'}} href='/'>KWILI</a>
                </Link>
            </div>

            <Link to='/map'>
                <input
                    type="submit"
                    value="Trouver des urgences"
                    href="/map"
                    className="navBarButton"

                />
            </Link>

            <Link to='/chat'>
                <input
                    type="submit"
                    value="Aidez-moi !"
                    href="/chat"
                    className="navBarButton"
                />
            </Link>
            <Link to='/'>
                <input
                    type="submit"
                    value="Qui sommes-nous ?"
                    href="/"
                    className="navBarButton"
                />
            </Link>
            <Link to='/download'>
                <input
                    type="submit"
                    value="Application"
                    href="/download"
                    className="navBarButton"
                />
            </Link>

            <ChatBotWidget />

        </div></React.Fragment>
    );
}
export default NavBarLanding;