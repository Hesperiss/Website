import React, { Component } from 'react';
import Search from './search-bar';
import KwiliApi from '../Shared/Api/api.js';
import NotLogged from "../Shared/LogHandling/NotLogged";

export default class Login extends Component {
	render() {
		if (!KwiliApi.isConnected())
			return <NotLogged />;
		return (
			<div>
				<Search />
			</div>
		);
	}
}
