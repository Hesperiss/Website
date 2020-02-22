import React, { Component } from 'react'
import KwiliChat from './Api';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import '../Chat/ChatBotWidget.css';

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
		addResponseMessage("Welcome !");
		addResponseMessage("I'm the Kwili chat-bot 😀");
		addResponseMessage("How can I help you ?");
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