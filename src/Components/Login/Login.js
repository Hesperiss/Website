// import '../../Styles.scss'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import KwiliApi from '../Shared/Api/api';

import classes from '../../Styles.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.errorMsg = '';
		this.state = {
			isLogin: this.props.location.state,
			show: false,
		};
		this.redirectPrescription = this.redirectPrescription.bind(this);
		this.tryLogin = this.tryLogin.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.toRegister = this.toRegister.bind(this);
	}
	redirectPrescription(loginResponse) {
		console.log(loginResponse);
		if (loginResponse != null) {
			KwiliApi.setSessionToken(loginResponse.data.access_token);
			this.props.history.push('/prescription');
		} else {
			this.errorMsg = 'Erreur : email et/ou mot de passe invalide.'
			this.setState({ show: true });
		}
	}
	tryLogin() {
		const login = document.getElementById('email-input').value;
		const password = document.getElementById('password-input').value;
		if (login === '') {
			this.errorMsg = 'Erreur : email manquant. Veuillez entrer votre adresse mail.';
			this.setState({ show: true })
		} else if (password === '') {
			this.errorMsg = 'Erreur : mot de passe manquant. Veuillez entrer votre mot de passe.';
			this.setState({ show: true })
		} else {
			var promise = KwiliApi.login(login, password);
			promise.then(this.redirectPrescription);
		}
	}

	toRegister() {
		this.props.history.push('/register');
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleChange(date) {
		this.setState({ startDate: date });
	}

	render() {

		return (
			<div className={classes.centerScreen}>
				<form className={classes.box}>
					<div className="form-group">
						<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Courriel" />
						<small id="emailHelp" className="form-text text-muted">Si vous n'avez pas de compte, vous pouvez vous en créer un en cliquant sur S'inscrire</small>
					</div>
					<div className="form-group">
						<input type="password" className="form-control" id="password-input" placeholder="Mot de passe" />
					</div>
					<button type="button" className={`btn btn-block btn-success ${classes.btnSpace}`} onClick={this.tryLogin}>Connexion</button>
					<button className={`btn btn-block btn-secondary ${classes.btnSpace}`} onClick={this.toRegister}>
						S'inscrire
					</button>
				</form>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>{this.errorMsg}</Modal.Body>
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
