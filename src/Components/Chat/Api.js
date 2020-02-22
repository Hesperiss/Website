import io from 'socket.io-client';
import 'dialogflow';

const chatEndpoint = 'http://51.83.79.250';
//const chatEndpoint = 'http://localhost';

export default class KwiliChat {
	constructor(onMessageCallback) {
		this.address = chatEndpoint + ':8083';
		this.socket = new io.connect(this.address, {
			reconnectionDelay: 3000,
			reconnectionAttempts: Infinity,
			forceNew: true
		});
		this.socket.on('message', onMessageCallback);
		this.socket.on('connect', () => {
		});
	}
	send(message) {
		this.socket.emit('message', message, () => {

		});
	}
}
