import React from 'react';
import './Styles.scss';
import KwiliApi from '../../Shared/Api/api';
import { Link } from 'react-router-dom'

export function navbarLanding() {
	if (KwiliApi.isConnected() === true) {
		return (
			<div className="Navbar">
				<Link to='/profile'>
					<input
						type="submit"
						value="Mon compte"
						href="/profile"
						className="navbarLink"
					/>
				</Link>
				<Link to='/map'>
					<input
						type="submit"
						value="Carte"
						href="/map"
						className="navbarLink"
					/>
				</Link>
				<Link to='/'>
					<input
						type="submit"
						value="Déconnexion"
						href="/"
						className="navbarLink"
						onClick={() => KwiliApi.logout()}
					/>
				</Link>
			</div>
		);
	} else {
		return (
			<div className="Navbar">
				<Link to='/login'>
					<input
						type="submit"
						value="Connexion"
						href="/login"
						className="navbarLink"
					/>
				</Link>

				<Link to='/register'>
					<input
						type="submit"
						value="Inscription"
						href="/register"
						className="navbarLink"
					/>
				</Link>
				<Link to='/map'>
					<input
						type="submit"
						value="Carte"
						href="/map"
						className="navbarLink"
					/>
				</Link>

			</div>
		);
	}
}
