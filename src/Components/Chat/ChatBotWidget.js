import React, { Component } from 'react'
import KwiliChat from './Api';
import { Widget, addResponseMessage, setQuickButtons, addUserMessage, dropMessages } from 'react-chat-widget';
import KwiliLogo from '../../Images/doctor.svg';

import 'react-chat-widget/lib/styles.css';
import '../Chat/ChatBotWidget.scss';

export default class ChatBotWidget extends Component {
	constructor() {
		super();
		this.state = {
			badge: 0,
		};
	}

	handleQuickButton = (msg) => {
		addUserMessage(msg);
		this.handleNewUserMessage(msg);
	}

	messageReceived = (msg) => {
		addResponseMessage(msg);
		if (msg.indexOf('?') !== -1) {
			this.setState({
				badge: this.state.badge + 1,
			});
		}
	}

	componentDidMount() {
		dropMessages();
		this.chat = new KwiliChat(this.messageReceived);
		setQuickButtons(
			[{
				label: "J'ai mal",
				value: "J'ai mal"
			}
		])
	}

	handleNewUserMessage = (newMessage) => {
		this.chat.send(newMessage);
		this.setState({
			badge: 0,
		});
	}

	render() {
		return (
			<div>
				<Widget
					handleNewUserMessage={this.handleNewUserMessage}
					handleQuickButtonClicked={this.handleQuickButton}
					profileAvatar={KwiliLogo}
					title="Chatbot Kwili"
					subtitle="Expliquez-nous votre problême"
					senderPlaceHolder="Aa"
					badge={this.state.badge}
				/>
			</div>
		);
	}
}