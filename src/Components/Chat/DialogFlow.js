import axios from 'axios'
import { KJUR } from 'jsrsasign'
import { dialogflowConfig } from '../Chat/env';

export default class DialogFlow {
	constructor() {
		this.tokenInterval = setInterval(this.generateToken, 3600000);
		this.generateToken();
	}

	generateToken = () => {
		const header = {
			alg: 'RS256',
			typ: 'JWT',
			kid: dialogflowConfig.private_key
		}

		// Payload
		const payload = {
			iss: dialogflowConfig.client_email,
			sub: dialogflowConfig.client_email,
			iat: KJUR.jws.IntDate.get('now'),
			exp: KJUR.jws.IntDate.get('now + 1hour'),
			aud: 'https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions'
		}

		const stringHeader = JSON.stringify(header)
		const stringPayload = JSON.stringify(payload)
		this.token = KJUR.jws.JWS.sign('RS256', stringHeader, stringPayload, dialogflowConfig.private_key)
	}

	sendMessage = (text, onTextReceivedCallback = () => { }, languageCode = 'en-US') => {
		const session = 'projects/mychatbot/agent/sessions/some-session-id';
		axios.defaults.baseURL = 'https://dialogflow.googleapis.com';
		axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
		axios.defaults.headers.post['Content-Type'] = 'application/json';

		axios.post(`/v2beta1/${session}:detectIntent`, {
			queryInput: {
				text: {
					text,
					languageCode
				}
			}
		}).then(onTextReceivedCallback).catch(error => console.log(error))
	};
}