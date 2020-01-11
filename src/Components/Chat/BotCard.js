import React, { Component } from 'react'
import KwiliApi from '../Shared/Api/api';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

export default class BotCard extends Component {
	constructor() {
		super();
		this.state = {
		};
	}

	componentDidMount() {
		addResponseMessage("Welcome Kwili chat-bot !");
	}

	handleNewUserMessage = (newMessage) => {
		console.log(`New message incoming! ${newMessage}`);
		// Now send the message throught the backend API
		addResponseMessage("beep boop");
	}

	render() {
		return (
			<div>
				<Widget handleNewUserMessage={this.handleNewUserMessage} />
			</div>
		);
	}
}