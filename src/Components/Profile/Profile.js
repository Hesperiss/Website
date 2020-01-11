import classes from '../../Styles.scss';
import KwiliCommon from '../Shared/LogHandling/common'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import KwiliApi from '../Shared/Api/api';
import NotLogged from "../Shared/LogHandling/NotLogged";
import Navbar from "../Shared/Navbar";

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
		if (!KwiliApi.isConnected())
			return <NotLogged />;
		if (!this.state.user)
			return KwiliCommon.loadingScreenPage();
		return (
			<div>
				<Navbar />
				<div className="jumbotron">
					<h1 className="display-4">{this.state.user.name}</h1>
					<p className="lead">{this.state.user.last_name}</p>
					<p className="lead">{this.state.user.email}</p>
					<hr className="my-4" />
					<p>{this.state.user.type}</p>
					<p className="lead">
						<Link className={`btn btn-lg btn-warning ${classes.btnSpace}`} to="/profile/settings">Settings</Link>
						<Link className={`btn btn-lg btn-outline-danger ${classes.btnSpace}`} to="/login" onClick={KwiliApi.logout}>Logout</Link>
					</p>
				</div>
			</div>
		);
	}
}
