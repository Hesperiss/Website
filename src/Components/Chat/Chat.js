import React, { Component } from 'react';
import Search from './search-bar';
import KwiliApi from '../Shared/Api/api.js';
import NotLogged from '../Shared/LogHandling/NotLogged';
import ChatBotWidget from './ChatBotWidget';
import Navbar from '../Shared/Navbar';
import { ChatList } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		};
	}
	addButton = (event, target) => {
		this.addChatCard("Leandre");
	}

	addChatCard = (name) => {
		this.state.list.push({
			avatar: "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-1/p240x240/71642826_2457574447611373_88435137561231360_o.jpg?_nc_cat=109&_nc_ohc=nFSmcShAWu4AQmNLKYFk6mvGyYEpfsOVT9zfxya5IQROFcCD0k_ZQAovQ&_nc_ht=scontent-gmp1-1.xx&_nc_tp=1&oh=7a1be41cad254c6ebc893c8fc2bdf8b6&oe=5E99C95F",
			alt: name,
			title: name,
			subtitle: "Viens manger des chips",
			date: new Date(),
			unread: 0
		});
		this.setState({
			list: this.state.list
		});
	}

	chatList = () => {
		return (
			<ChatList
				className={"chat-list"}
				dataSource={this.state.list}
			/>
		);
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
								<button type="button" className="btn btn-primary" onClick={this.addButton}>chat</button>
							</div>
							{this.chatList()}
						</div>
					</div>
					<ChatBotWidget />
				</div>
			</div >
		);
	}
}
