var request = require('request');
var querystring = require('querystring');

module.exports = (function (config) {
    var accessToken;
    var apiRoot = config.apiRoot || 'https://api.github.com';
    var headers = {
        'Accept': 'application/json',
        'User-Agent': config.appName
    } || config.headers;

    /*=========================================
    =            Private functions            =
    =========================================*/
    
    function makeRequest(data, callback) {
        data.headers = data.headers || headers;
        data.urlParameters = data.urlParameters || {};
        data.auth = data.auth || false;
        data.method = data.method || 'GET';

        if (data.auth) {
            data.urlParameters.access_token = accessToken;
        }

        var urlString = querystring.encode(data.urlParameters);

        if (urlString) {
            data.url = data.url + '?' + urlString;
        }

        var payload = {
            headers: data.headers,
            url: apiRoot + data.url,
            method: data.method
        };

        if (data.body) {
            payload.json = data.body;
        }

        request(payload, callback);
    }


    /*========================================
    =            Public functions            =
    ========================================*/
    
    function setAccessToken(newAccessToken) {
        accessToken = newAccessToken;
    }

    function get(data, callback) {
        data.method = 'GET';

        return makeRequest(data, callback);
    }

    function post(data, callback) {
        data.method = 'POST';

        return makeRequest(data, callback);
    }

    function put(data, callback) {
        data.method = 'PUT';

        return makeRequest(data, callback);
    }

    function del(data, callback) {
        data.method = 'DELETE';

        return makeRequest(data, callback);
    }
    

    return {
        setAccessToken: setAccessToken,
        get: get,
        post: post,
        put: put,
        del: del
    }
});