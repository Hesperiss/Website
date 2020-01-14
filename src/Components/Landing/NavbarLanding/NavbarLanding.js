import React from 'react';
import classes from './Styles.scss';
import KwiliApi from '../../Shared/Api/api';
import { Link } from 'react-router-dom'

export function navbarLanding() {
	if (KwiliApi.isConnected() === true) {
		return (
			<div className={classes.Navbar}>
				<Link to='/test'>
					<input
						type="submit"
						value="Mon compte"
						href="/profile"
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
				<Link to='/'>
					<input
						type="submit"
						value="Déconnexion"
						href="/"
						className={classes.navbarLink}
						onClick={() => KwiliApi.logout()}
					/>
				</Link>
			</div>
		);
	} else {
		return (
			<div className={classes.Navbar}>
				<Link to='/login'>
					<input
						type="submit"
						value="Connexion"
						href="/login"
						className={classes.navbarLink}
					/>
				</Link>

				<Link to='/register'>
					<input
						type="submit"
						value="Inscription"
						href="/register"
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
}
