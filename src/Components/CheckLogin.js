// import '../../Styles.scss'
import React, { Component } from 'react';
import { Redirect } from 'react-router';
//import { Button, Modal } from 'react-bootstrap';
import KwiliApi from './Shared/Api/api';


class CheckLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
    if (KwiliApi.isConnected() !== true) {
      return <Redirect to={{pathname: this.props.path, state: {errorMsg: "Erreur: vous devez être connecté pour pouvoir accéder à cette page."}}} />
    }
		return (
      <div>
        Bienvenue sur votre compte !
			</div>
		)
	}
}

export default CheckLogin;
