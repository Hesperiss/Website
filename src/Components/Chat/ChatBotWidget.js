import React, { Component } from 'react'
import KwiliChat from './Api';
import { Widget, addResponseMessage, setQuickButtons, addUserMessage, dropMessages, toggleWidget, toggleMsgLoader } from 'react-chat-widget';
import KwiliLogo from '../../Images/doctor.svg';

import anchorme from "anchorme"
import 'react-chat-widget/lib/styles.css';
import '../Chat/ChatBotWidget.scss';

export default class ChatBotWidget extends Component {
	constructor(props) {
		super(props);
		this.fullscreen = props.fullscreen;
		this.waitingReply = false;
		this.state = {
			badge: 0,
		};
		this.widget = (
			<Widget
				handleNewUserMessage={this.handleNewUserMessage}
				handleQuickButtonClicked={this.handleQuickButton}
				profileAvatar={KwiliLogo}
				showCloseButton={!this.fullscreen}
				title="Chatbot"
				subtitle="Expliquez-nous votre problème"
				senderPlaceHolder="Aa"
			/>);
		if (this.fullscreen) {
			toggleWidget();
		}
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
		const list = anchorme.list(msg);
		for (let i = 0; i < list.length; ++i) {
			msg = msg.replace(list[i].string, `[${list[i].string}](${list[i].string})`)
		}
		addResponseMessage(msg);
		if (msg.indexOf('?') !== -1) {
			this.setState({
				badge: this.state.badge + 1,
			});
		}
		if (this.waitingReply) {
			this.waitingReply = false;
			toggleMsgLoader();
		}
	}

	componentDidMount() {
		dropMessages();
		this.chat = new KwiliChat(this.messageReceived);
		this.refreshQuickButtons();
	}

	handleNewUserMessage = (newMessage) => {
		if ((newMessage.indexOf('boss') !== -1 || newMessage.indexOf('maitre')) !== -1
			&& (newMessage.indexOf('ultime') !== -1 || newMessage.indexOf('absolu') !== -1)) {
			addResponseMessage('Mon maitre ultime est Leandre');
			return;
		}
		this.chat.send(newMessage);
		this.setState({
			badge: 0,
		});
		if (this.waitingReply === false) {
			this.waitingReply = true;
			toggleMsgLoader();
		}
	}

	render() {
		return (
			<div>
				{this.widget}
			</div>
		);
	}
}