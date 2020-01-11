import React, { Component } from 'react';
import Search from './search-bar';
import KwiliApi from '../Shared/Api/api.js';
import NotLogged from "../Shared/LogHandling/NotLogged";
import BotCard from "./BotCard";
import Navbar from "../Shared/Navbar";

export default class Login extends Component {
	constructor() {
		super();
		this.state = {

		};
	}
	addButton = (event, target) => {
		console.log(target);
	}
	render() {
		if (!KwiliApi.isConnected())
			return <NotLogged />;
		return (
			<div>
				<div>
					<Navbar />
					<div className="jumbotron jumbotron-fluid">
						<div className="container">
							<h5 className="display-4">Kwili Chat</h5>
							<p className="lead">You can directly use our ChatBot or search for a doctor.</p>
							<hr className="my-4"></hr>
							<div className="btn-toolbar" role="toolbar">
								<div className="input-group">
									<div className="input-group-prepend">
										<Search id="search-bar" />
									</div>
								</div>
								<button type="button" className="btn btn-primary" onClick={this.addButton}> + </button>
							</div>
						</div>
					</div>
					<BotCard />
				</div>
			</div >
		);
	}
}
