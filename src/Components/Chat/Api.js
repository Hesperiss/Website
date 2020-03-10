import Dialogflow from '../Chat/DialogFlow';

export default class KwiliChat {
	constructor(onMessageCallback) {
		this.api = new Dialogflow();
		this.callback = onMessageCallback;
	}
	send(message) {
		this.api.sendMessage(message, this.callback);
	}
}
