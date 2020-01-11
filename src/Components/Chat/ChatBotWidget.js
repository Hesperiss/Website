import React, { Component } from 'react'
import KwiliChat from './Api';
import { Widget, addResponseMessage } from 'react-chat-widget';

import '../Chat/ChatBotWidget.css'

export default class BotCard extends Component {
	constructor() {
		super();
		this.state = {
		};
	}

	messageReceived = (msg) => {
		addResponseMessage(msg);
	}

	componentDidMount() {
		this.chat = new KwiliChat(this.messageReceived);
		addResponseMessage("Welcome Kwili chat-bot !");
	}

	handleNewUserMessage = (newMessage) => {
		this.chat.send(newMessage);
	}

	render() {
		return (
			<div>
				<Widget handleNewUserMessage={this.handleNewUserMessage} />
			</div>
		);
	}
}