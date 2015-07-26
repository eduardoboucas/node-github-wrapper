# GitHub API Wrapper

> A really simple GitHub API wrapper for Node.js

## Installation

```
npm install node-github-wrapper
```

## Initialization

```javascript
var githubAPI = require('node-github-wrapper')({
    appName: 'Your app name'
});
```

`appName` will be used in the `User-Agent` header in the requests.

Please note that this library **does not** handle OAuth authorization. If you need to make requests that require authorization, you'll need to handle that separately, using something like [node-oauth](https://github.com/ciaranj/node-oauth) and pass the resulting access token to this library using `setAccessToken()`.

## API

### `.setAccessToken(token)`

Sets the access token to be used by all requests that require authorization.

### `.get(data, callback)`

Sends a `GET` request to the API, with [request data](#request-data) and a callback function.

### `.post(data, callback)`

Sends a `POST` request to the API, with request data and a callback function.

### `.put(data, callback)`

Sends a `PUT` request to the API, with request data and a callback function.

### `.del(data, callback)`

Sends a `DELETE` request to the API, with request data and a callback function (method is called `del()` because `delete` is a reserved word in JavaScript).

### Request data


