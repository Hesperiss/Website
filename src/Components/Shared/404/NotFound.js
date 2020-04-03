import React from 'react';

import NavBarLanding from '../../Landing/Components/Navbar';

import './css/NotFound.scss';

const Error = () => {
    return (
        <div className={"notFoundWrapper"}>
            <NavBarLanding/>
            <div className={"notFound"}>
                <h1>Oops!</h1>
                <h2>404 - Page not found</h2>
                <p>La page que vous recherchez n'est pas disponible, elle a peut-être été modifiée ou retirée.</p>
                <a href="/">Accueil</a>
            </div>
        </div>
    )
};

export default Error;