import io from 'socket.io-client';
export default class CareChat
{
	constructor(token, onMessageCallback)
	{
		this.address = 'http://51.83.79.250:8081/';
		this.token = token;
		this.is_connected = false;
		this.socket = new io.connect(this.address, {
			query : 'token=' + this.token,
			transports : [ 'websocket' ]
		});
		this.data = [];
		this.socket.on('message', onMessageCallback);
	}

	_on_receive_start(err, answer)
	{
		if (err) {
			console.log(err);
			return;
		}
		if (answer.logs == null)
			return;
		answer.logs.forEach(message => {
			this.data.append(message);
		});
		this.is_connected = true;
	}
	_on_receive_message(message)
	{
		this.data += message;
	}
	start(user_id)
	{
		if (this.is_connected)
			return true;
		this.socket.emit('start', user_id, this._on_receive_start);
	}
	send(message)
	{
		if (!this.is_connected)
			return false;
		this.socket.emit('message', message, this._on_receive_message);
	}
}
