import KwiliApi from "../Shared/Api/api"

export default class PrescriptionApi {
    static tryRequest(usedMethod, data, npath) {
        return KwiliApi.request(usedMethod, data, 'http://Kwili.fr:8082/' + npath);
    }

    static tryQuery(method, query, npath) {
        let url = npath + '?';

        for (let key in query) {
            url += key.toString() + '=' + query[key].toString() + '$';
        }
        url = url.slice(0, -1);
        return this.tryRequest(method, undefined, url);
    }

    static getFileNames() {
        let token = KwiliApi.getSessionToken();
        if (token == null)
            token = "";
        const query = {
            token: token,
        };
        return this.tryQuery('GET', query, "download")
    }

    static getFile(fileName) {
        let token = KwiliApi.getSessionToken();
        if (token == null)
            token = "";
        return ("http://Kwili.fr:8082/download/" + fileName + "?token=" + token)
    }

    static upload() {
        let token = KwiliApi.getSessionToken();
        if (token == null)
            token = "";
        return ("http://Kwili.fr:8082/upload?token=" + token)
    }
}