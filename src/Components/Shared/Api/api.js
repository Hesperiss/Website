import axios from 'axios';

const userdataToken = 'Kwili-login-data';

export default class KwiliApi  {
    static async request(method, data, path) {
        const response = await axios({
            method: method,
            url: path,
            data: data,
        }).catch(function (err) {
            console.log(path + ': ' + err);
            return null;
        });
        return response;
    }

    static tryRequest(usedMethod, data, npath) {
        //return this.request(usedMethod, data, 'https://www.kwili.fr:8080/' + npath);
        return this.request(usedMethod, data, 'https://localhost:8080/' + npath);
    }

    static tryQuery(method, query, npath) {
        var url = npath + '?';

        for (var key in query) {
            url += key.toString() + '=' + query[key].toString() + '$';
        }
        url = url.slice(0, -1);
        return this.tryRequest(method, undefined, url);
    }

    static login(email, passwd) {
        const data = {
            "email": email,
            "password": passwd
        };
        var content = this.tryRequest('POST', data, 'login');
        return content;
    }

    static register(name, lastName, email, passwd, type) {
        const data = {
            "name": name,
            "last_name": lastName,
            "email": email,
            "password": passwd,
            "type": type
        };
        var content = this.tryRequest('POST', data, 'register');
        return content;
    }

    static confirmAccount(token) {
        const data = {
            "token": token
        };
        var content = this.tryRequest('POST', data, 'confirm');
        return content;
    }

    static sendResetPassword(email) {
        const data = {
            "email": email
        };
        var content = this.tryRequest('GET', data, 'reset');
        return content;
    }

    static resetPassword(emailToken, email, passwd) {
        const data = {
            "token": emailToken,
            "email": email,
            "password": passwd
        };
        var content = this.tryRequest('POST', data, 'reset');
        return content;
    }

    static getProfileInfo() {
        var token = this.getSessionToken();
        if (token == null)
            token = "";
        const query = {
            token: token,
        };
        var content = this.tryQuery('GET', query, 'profile');
        return content;
    }

    static isConnected() {
        var item = sessionStorage.getItem(userdataToken);
        if (item === "undefined" || item == null || item.length === 0)
            return false;
        return true;
    }

    static getLogin() {
      var item = sessionStorage.getItem('toto');
      if (item === "undefined" || item == null || item.length === 0)
          return false;
      return true;
    }

    static setLogin() {
          sessionStorage.setItem('toto', true);
    }

    static getSessionToken() {
        var token = sessionStorage.getItem(userdataToken);
        return token;
    }

    static setSessionToken(data) {
        this.logout();
        sessionStorage.setItem(userdataToken, data);
    }

    static logout() {
        sessionStorage.clear();
    }
}
