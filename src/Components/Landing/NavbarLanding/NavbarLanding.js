import React from 'react';
import classes from './Styles.scss';
import { Link } from 'react-router-dom'

export function navbarLanding() {

	return (
		<div className={classes.Navbar}>
			<Link to={{
  			pathname: '/login',
  			state: {
    			isLogin: true
				}
			}}>
				<input
					type="submit"
					value="Connexion"
					href="/login"
					className={classes.navbarLink}
				/>
			</Link>

			<Link to='/login'>
				<input
					type="submit"
					value="Inscription"
					href="/login"
					className={classes.navbarLink}
				/>
			</Link>
			<Link to='/map'>
				<input
					type="submit"
					value="Carte"
					href="/map"
					className={classes.navbarLink}
				/>
			</Link>

		</div>
	);

}
