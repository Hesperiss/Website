import axios from 'axios';

const userdataToken = 'Kwili-login-data';

const userEndpoint = 'http://51.83.79.250:8080/';
//const userEndpoint = 'http://localhost:8080/';

export default class KwiliApi {
	static async request(method, data, path, headers) {
		if (data === undefined)
			data = {};
		const response = await axios({
			method: method,
			url: path,
			data: data,
			headers: headers,
		}).catch(function (err) {
			console.log(path + ': ' + err);
			return null;
		});
		return response;
	}

	static tryRequest(usedMethod, npath, data) {
		return this.request(usedMethod, data.data,
			userEndpoint + npath,
			data.headers);
	}

	static tryQuery(method, npath, data) {
		var url = npath + '?';

		for (var key in data.query) {
			url += key.toString() + '=' + data.query[key].toString()
				+ '$';
		}
		url = url.slice(0, -1);
		return this.tryRequest(method, url, data);
	}

	static login(email, passwd) {
		const data = {
			"data": {
				"email": email,
				"password": passwd,
			},
			"headers": {
				"Content-Type": "application/json",
			},
		};
		var content = this.tryRequest('POST', 'login', data);
		return content;
	}

	static register(form) {
		const data = {
			"data": form,
			"headers": {
				"Content-Type": "application/json",
			},
		};
		var content = this.tryRequest('POST', 'register', data);
		return content;
	}

	static confirmAccount(token) {
		const data = {
			"data": {
				token: token
			},
			"headers": {
				"Content-Type": "application/json",
			},
		};
		var content = this.tryRequest('POST', 'confirm', data);
		return content;
	}

	static sendResetPassword(email) {
		const data = {
			"data": {
				"email": email,
			},
			"headers": {
				"Content-Type": "application/json",
			},
		};
		var content = this.tryRequest('GET', 'reset', data);
		return content;
	}

	static resetPassword(emailToken, email, passwd) {
		const data = {
			"data": {
				"token": emailToken,
				"email": email,
				"password": passwd
			},
			"headers": {
				"Content-Type": "application/json",
			},
		};
		var content = this.tryRequest('POST', 'reset', data);
		return content;
	}

	static getProfileInfo() {
		var token = this.getSessionToken();
		if (token == null)
			token = "";
		const data = {
			"headers": {
				"authorization": token,
				"Content-Type": "application/json",
			}
		};
		var content = this.tryRequest('GET', 'profile', data);
		return content;
	}

	static isConnected() {
		var item = sessionStorage.getItem(userdataToken);
		if (item === "undefined" || item == null || item.length === 0)
			return false;
		return true;
	}

	static getSessionToken() {
		var token = sessionStorage.getItem(userdataToken);
		return token;
	}

	static setSessionToken(data) {
		this.logout();
		sessionStorage.setItem(userdataToken, data);
	}

	static searchUser(name) {
		var token = this.getSessionToken();
		if (token == null)
			token = "";
		var data = {
			"query": {
				"name": name,
			},
			"headers": {
				"Content-Type": "application/json",
				"authorization": token,
			},
		};
		var content = this.tryQuery('GET', 'search', data)
		return content;
	}

	static logout() {
		sessionStorage.clear();
	}
}
