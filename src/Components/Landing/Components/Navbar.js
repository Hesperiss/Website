import React from 'react';
import '../Landing.scss';
import { Link } from 'react-router-dom'
import KwiliLogo from "../../../Images/logo_kwili.png"

function NavBarLanding(props) {
    return (
        <React.Fragment>
        <div className="navBar">

            <div className={"kwiliTagNavBar"}>
                <img className={"kwiliLogo"} src={KwiliLogo} alt={"logo de Kwili"}/>
                KWILI
            </div>

            <Link to='/map'>
                <input
                    type="submit"
                    value="Trouver des urgences"
                    href="/map"
                    className="navBarSlider"

                />
            </Link>

            <Link to='/chat'>
                <input
                    type="submit"
                    value="Aidez-moi !"
                    href="/chat"
                    className="navBarSlider"
                />
            </Link>
            <Link to='/'>
                <input
                    type="submit"
                    value="Qui sommes-nous ?"
                    href="/"
                    className="navBarSlider"
                />
            </Link>
            <Link to='/download'>
                <input
                    type="submit"
                    value="Application"
                    href="/download"
                    className="navBarSlider"
                />
            </Link>

        </div></React.Fragment>
    );
}
export default NavBarLanding;