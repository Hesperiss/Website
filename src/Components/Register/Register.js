// import '../../Styles.scss'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import KwiliApi from '../Shared/Api/api';

import classes from '../../Styles.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMsg: '',
			isLogin: this.props.location.state,
			show: false,
			form: {
				name: '',
				last_name: '',
				email: '',
				password: '',
				type: 'patient',
			},
			password_bis: '',
		};
	}

	redirectPrescription = (loginResponse) => {
		if (loginResponse != null) {
			KwiliApi.setSessionToken(loginResponse.data.access_token);
			this.props.history.push('/prescription');
		} else {
			this.setState({
				show: true,
				errorMsg: 'Erreur : email et/ou mot de passe invalide.'
			});
		}
	}

	tryRegister = () => {
		if (this.state.form.name === '' || this.state.form.last_name === '' || this.state.form.email === '' || this.state.form.password === '' || this.state.form.type === '') {
			this.setState({
				show: true,
				errorMsg: 'Erreur: un ou plusieurs champs n\'ont pas été remplis.'
			});
			return false;
		}
		else if (this.state.password_bis.localeCompare(this.state.form.password) !== 0) {
			this.setState({
				show: true,
				errorMsg: 'Erreur: veuillez entrer le même mot de passe.'
			});
			return false;
		} else {
			KwiliApi.register(this.state.form).then((response) => {
				if (response != null && response.status === 201) {
					alert("Un courriel de confirmation a été envoyée à l'adresse renseignée");
				} else {
					this.setState({
						show: true,
						errorMsg: 'Veuillez vérifier les informations saisies.'
					});
				}
			});
		}
		return false;
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleChange = (date) => {
		this.setState({ startDate: date });
	}

	handlePassBis = (event) => {
		this.setState({
			password_bis: event.target.value
		});
	}

	handleInput = (event) => {
		var field = event.target.attributes.field.value;
		const string = event.target.value;
		var obj = this.state.form;
		obj[field] = string;
		this.setState({
			form: obj,
		});
	}

	toLogin = () => {
		this.props.history.push('/login');
	}

	render() {
		return (
			<div className={classes.centerScreen}>
				<div className={classes.box}>
					<form>
						<div className="form-group">
							<label>Prénom</label>
							<input field="name" className="form-control" placeholder="Indiquez votre prénom" value={this.state.form.name} onChange={this.handleInput} />
						</div>
						<div className="form-group">
							<label>Nom</label>
							<input field="last_name" className="form-control" placeholder="Indiquez votre nom" value={this.state.form.last_name} onChange={this.handleInput} />
						</div>
						<div className="form-group">
							<label>Date de naissance</label>
							<input type="date" min="1900-01-10" max="2019-06-12" />
						</div>
						<div className="form-group">
							<label>Courriel</label>
							<input type='email' field='email' className="form-control" placeholder="Indiquez votre courriel" value={this.state.form.email} onChange={this.handleInput} />
							<small className="form-text text-muted">Votre courriel ne sera jamais diffusé à des acteurs tiers.</small>
						</div>
						<div className="form-group">
							<label>Mot de passe</label>
							<input type="password" field="password" className="form-control" placeholder="Mot de passe" value={this.state.form.password} onChange={this.handleInput} />
						</div>
						<div className="form-group">
							<label>Confirmez votre mot de passe</label>
							<input type="password" className="form-control" placeholder="Confirmation du mot de passe" value={this.state.password_bis} onChange={this.handlePassBis} />
						</div>
						{
							// <div className="form-group">
							//   <label>Type de compte</label>
							//   <input type="name" className="form-control" id="type-input" placeholder="patient / doctor ?" />
							// </div>
						}
						<button type="button" className="btn btn-block btn-primary" onClick={this.tryRegister}>S'inscrire</button>
						<button type="button" className={`btn btn-block btn-secondary ${classes.btnSpace}`} onClick={this.toLogin}>
							Déjà inscrit ?
            </button>
					</form>
				</div>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>{this.state.errorMsg}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Fermer
            </Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default withRouter(Login);
