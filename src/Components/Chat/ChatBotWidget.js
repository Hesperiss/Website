import React, { Component } from 'react';
import '../Chat/ChatBotWidget.scss';
import chatbotIcon from '../../Images/doctor.svg';
import cancelButton from '../../Images/stop.svg';

const dialogflowURL = 'https://console.dialogflow.com/api-client/demo/embedded/94fed26f-5471-46d5-ae5a-8ac8c32cc30f'

export default class BotCard extends Component {
	constructor() {
		super();
		this.width = 350;
		this.height = 430;
		this.state = {
			shown: false
		};
	}

	changeState = () => {
		this.setState({
			shown: !this.state.shown
		});
	}

	render() {
		return (
			<div className='chatbot-container'>
				<div>
					<iframe
						hidden={!this.state.shown}
						title='chatbot'
						allow='microphone;'
						width={this.width}
						height={this.height}
						src={dialogflowURL}>
					</iframe>
				</div>
				<img className='chatbot-icon btn'
					width={this.state.shown ? 50 : 100}
					height={this.state.shown ? 50 : 100}
					src={this.state.shown ? cancelButton : chatbotIcon}
					alt='chatbot'
					onClick={this.changeState}>
				</img>
			</div >
		);
	}
}