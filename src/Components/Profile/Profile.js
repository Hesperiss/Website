import KwiliCommon from '../Shared/LogHandling/common'
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import KwiliApi from '../Shared/Api/api';
import Navbar from "../Shared/Navbar";

import styles from './Profile.scss'

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.refreshInfo = (response) => {
			console.log(response);
			if (response != null) {
				this.setState({
					user: response.data.user,
				});
			}
		};
	}
	componentWillMount() {
		if (KwiliApi.isConnected())
			KwiliApi.getProfileInfo().then(this.refreshInfo);
	}
	render() {
		if (KwiliApi.isConnected() !== true) {
			return <Redirect to={{ pathname: '/login', state: { errorMsg: "Erreur: vous devez être connecté pour pouvoir accéder à cette page." } }} />
		}
		if (!this.state.user)
			return KwiliCommon.loadingScreenPage();
		return (
			<div style={{ backgroundColor: "#0277bd" }}>
				<Navbar />

				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<img alt="avatar" className={styles.zone} src="https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-1/p240x240/71642826_2457574447611373_88435137561231360_o.jpg?_nc_cat=109&_nc_ohc=nFSmcShAWu4AQmNLKYFk6mvGyYEpfsOVT9zfxya5IQROFcCD0k_ZQAovQ&_nc_ht=scontent-gmp1-1.xx&_nc_tp=1&oh=7a1be41cad254c6ebc893c8fc2bdf8b6&oe=5E99C95F" />
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<h1 className="display-4" style={{ color: "white" }} >{this.state.user.name} {this.state.user.last_name}</h1>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<p className="lead" style={{ color: "white" }}>{this.state.user.email}</p>
				</div>

				<p>{this.state.user.type}</p>
				<div className="jumbotron" style={{ backgroundColor: "#58a5ef", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
					<Link className={styles.button} style={{ textAlign: "center" }} to="/profile/settings">Paramètres</Link>
					<Link className={styles.button} to="/" onClick={KwiliApi.logout}>Déconnexion</Link>
				</div>
			</div>
		);
	}
}
