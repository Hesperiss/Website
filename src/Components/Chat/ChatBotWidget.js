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
		this.quickButtons = [[{
			label: "Au ventre",
			value: "Au ventre",
		}, {
			label: "À la tête",
			value: "À la tête",
		}, {
			label: "Au dos",
			value: "Au dos",
		},
		], [{
			label: "J'ai mal",
			value: "J'ai mal",
		}], [{
			label: "Bonjour",
			value: "Bonjour",
		}],
		];
	}

	refreshQuickButtons = () => {
		if (this.quickButtons.length > 0) {
			setQuickButtons(this.quickButtons[this.quickButtons.length - 1]);
		}
		else {
			setQuickButtons([]);
		}
	}

	iterateQuickButtons = () => {
		if (this.quickButtons.length > 0) {
			this.quickButtons.pop();
			this.refreshQuickButtons();
		}
	}

	handleQuickButton = (msg) => {
		addUserMessage(msg);
		this.handleNewUserMessage(msg);
		this.iterateQuickButtons();
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
		this.refreshQuickButtons();
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