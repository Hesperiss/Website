import io from "socket.io-client";

const chatEndpoint = "https://kwili-bot.herokuapp.com/";

/**
 * @module
 */
export default class KwiliChat {
	/**
	 * Cette class est un wrapper sur socket.io et relie le chatbot avec le backend.
	 * @class
	 * @param {requestCallback} onMessageCallback - callback appelée lors de la réception d'un message
	 */
	constructor(onMessageCallback) {
		this.address = chatEndpoint;
		this.socket = new io.connect(this.address, {
			reconnectionDelay: 3000,
			reconnectionAttempts: Infinity,
			forceNew: true,
		});
		this.socket.on("message", onMessageCallback);
		this.socket.on("connect", () => {});
	}
	send(message) {
		this.socket.emit("customer message", message, () => {});
	}
}
