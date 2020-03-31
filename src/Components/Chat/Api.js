import io from 'socket.io-client';

const chatEndpoint = 'http://51.83.79.250';
//const chatEndpoint = 'http://localhost';
const port = '8084';

export default class KwiliChat {
	constructor(onMessageCallback) {
		this.address = chatEndpoint + ':' + port + '/customer';
		this.socket = new io.connect(this.address, {
			reconnectionDelay: 3000,
			reconnectionAttempts: Infinity,
			forceNew: true
		});
		this.socket.on('customer message', onMessageCallback);
		this.socket.on('connect', () => {
		});
	}
	send(message) {
		this.socket.emit('customer message', message, () => {

		});
	}
}
