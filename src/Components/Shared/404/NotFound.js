import React from 'react';

import NavBarLanding from '../../Landing/Components/Navbar';

import classes from './css/style.css';

const Error = () => {
  return (
    <div style={{ backgroundColor: 'white'}}>
      <NavBarLanding/>
      <div id={classes.notfound}>
        <div class={classes.notfound}>
          <div class={classes.notfound404}>
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>La page que vous recherchez n'est pas disponible, elle a peut-être été modifiée ou retirée.</p>
          <a href="/">Accueil</a>
        </div>
      </div>
    </div>
  )
}

export default Error;
