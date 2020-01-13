import io from 'socket.io-client';

const chatEndpoint = 'api.kwili.fr';

export default class KwiliChat {
	constructor(onMessageCallback) {
		this.address = chatEndpoint + ':8083';
		this.socket = new io.connect(this.address, {
			reconnectionDelay: 1000,
			reconnectionAttempts: 1,
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
