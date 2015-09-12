var request = require('request');
var querystring = require('querystring');

module.exports = (function (githubConfig) {
    var accessToken;
    var apiRoot = githubConfig.apiRoot || 'https://api.github.com/';
    var headers = {
        'Accept': 'application/json',
        'User-Agent': githubConfig.appName
    } || githubConfig.headers;
    var clientId = githubConfig.clientId;
    var clientSecret = githubConfig.clientSecret;
    var redirectUri = githubConfig.redirectUri;
    var scopes = githubConfig.scopes;

    /*=========================================
    =            Private functions            =
    =========================================*/
    
    function makeRequest(data, callback) {
        data.headers = data.headers || headers;
        data.urlParameters = data.urlParameters || {};
        data.auth = (data.auth === false) ? false : accessToken;
        data.method = data.method || 'GET';
        
        if (data.auth) {
            data.urlParameters.access_token = accessToken;
        }

        var urlString = querystring.encode(data.urlParameters);

        if (urlString) {
            data.url = data.url + '?' + urlString;
        }

        data.url = (data.url.substring(0, 4) === 'http') ? data.url : apiRoot + data.url;

        var payload = {
            headers: data.headers,
            url: data.url,
            method: data.method
        };

        if (data.body) {
            payload.json = data.body;
        }

        if (data.parseJSON) {
            request(payload, function (err, response, body) {
                try {
                    var parsedBody = JSON.parse(body);
                
                    callback.call(undefined, err, response, parsedBody);
                } catch (parseErr) {
                    callback.call(undefined, parseErr, response, body);
                }                
            });          
        } else {
            request(payload, callback);
        }
    }


    /*========================================
    =            Public functions            =
    ========================================*/

    function getAuthURL() {
        var variables = {
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scopes
        };

        var url = 'https://github.com/login/oauth/authorize?' + querystring.encode(variables);

        // UGLY!
        if (Array.isArray(scopes)) {
            url = url.replace(/scope=/g, 'scope[]=');
        }

        return url;
    }

    function authorize(code, callback) {
        post({
            url: 'https://github.com/login/oauth/access_token',
            body: {
                client_id: clientId,
                client_secret: clientSecret,
                code: code                
            }
        }, function (err, response, body) {
            setAccessToken(body.access_token);

            if (typeof callback == 'function') {
                callback.call(undefined, err, response, body);
            }
        });
    }   

    function setAccessToken(newAccessToken) {
        accessToken = newAccessToken;

        return this;
    }

    function getAccessToken() {
        return accessToken;
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
        getAuthURL: getAuthURL,
        authorize: authorize,
        setAccessToken: setAccessToken,
        getAccessToken: getAccessToken,
        get: get,
        post: post,
        put: put,
        del: del
    }
});