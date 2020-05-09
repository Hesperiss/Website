import settingsClasses from './Settings.scss';
import stylesClasses from '../../Styles.scss';
import KwiliCommon from '../Shared/LogHandling/common'
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import KwiliApi from '../Shared/Api/api';

import Navbar from "../Shared/Navbar";

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.refreshInfo = (response) => {
			if (response != null) {
				this.setState({
					user: response.data.user,
				});
				console.log(this.state.user);
			}
		};
		this.handleChange = (event) => {
			let user = this.state.user;
			user[event.target.id] = event.target.value;
			this.setState({
				user: user,
			});
		}
	}

	tryRefresh(event) {
		event.preventDefault();
		const name = document.getElementById('name').value;
		const last_name = document.getElementById('last_name').value;
		const email = document.getElementById('email').value;
		if (name === '') {
			console.log("Erreur : Prenom manquant");
		} else if (last_name === '') {
			console.log("Erreur : Nom manquant");
		} else if (email === '') {
			console.log("Erreur : Mail manquant");
		} else {
			console.log("mail envoyé");
			KwiliApi.sendResetPassword(email);
		}
	}

	UNSAFE_componentWillMount() {
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
				<div className={stylesClasses.centerScreen}>

					<div className={`${stylesClasses.box} ${settingsClasses.glob} col-6 ${settingsClasses.glob}`}>
						<div className={`${settingsClasses.inputBorders} col-11`}>
							<input type="text" className="form-control" id="name" placeholder="Name" value={this.state.user.name} onChange={this.handleChange} />
							<input type="text" className="form-control" id="last_name" placeholder="Lastname" value={this.state.user.last_name} onChange={this.handleChange} />
							<input type="text" className="form-control" id="email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} />
						</div>
						<br />
						<Link className={`btn btn-block btn-success ${stylesClasses.btnSpace}`} to="/profile" onClick={this.tryRefresh}>Accepter</Link>
						<Link className={`btn btn-block btn-secondary ${stylesClasses.btnSpace}`} to="/profile">Annuler</Link>
					</div>
				</div>
			</div>
		);
	}
}
