# GitHub API Wrapper

> A really simple GitHub API wrapper for Node.js

## Installation

```
npm install node-github-wrapper
```

## Initialization

```javascript
var githubAPI = require('node-github-wrapper')(options);
```

### Options (Object):

| Option  | Description  | Default value |
|---|---|---|
| appName | Name of the application. Will be used in the request headers |   |
| apiRoot  | Base URL of the GitHub API | https://api.github.com  |
| headers  | Headers to be sent with all requests  | `{'Accept': 'application-json', 'User-Agent': appName}`  |

## Authentication

This library can handle the OAuth authentication with the GitHub API. The following is a typical workflow:

1. Generate a auth URL by calling `getAuthURL()`. By accessing that URL, users will be asked for permission to give your app access to their account;
2. When permission is granted, a callback URL will be called along with an authorization code. This code can be passed to `authorize()` which will exchange that code for an access token.

Alternatively, if you're already in the possession of a valid access token (i.e. you stored it in a database for subsequent requests), you can call `setAccessToken()` directly to authenticate requests.

## API

### `.getAuthURL()`

Generates a URL that redirects users to request GitHub access

### `.authorize(code, callback)`

Exchanges the OAuth code for an access token and runs the callback function

### `.setAccessToken(token)`

Sets the access token to be used by all requests that require authorization.

### `.get(data, callback)`

Sends a `GET` request to the API, with [request data](#request-data) and a callback function.

### `.post(data, callback)`

Sends a `POST` request to the API, with [request data](#request-data) and a callback function.

### `.put(data, callback)`

Sends a `PUT` request to the API, with [request data](#request-data) and a callback function.

### `.del(data, callback)`

Sends a `DELETE` request to the API, with [request data](#request-data) and a callback function (method is called `del()` because `delete` is a reserved word in JavaScript).

### Request data

Each requests receives as an argument an object with a set of options.

#### `url`

API endpoint, without the API root prefix.

```javascript
{url: '/user'}
```

Generates https://api.github.com/user.

#### `urlParameters`

A list of key/value parameters to be added to the endpoint URL.

```javascript
{
  url: '/user',
  urlParameters: {
    foo: 'bar',
    baz: 'qux'
  }
```

Generates https://api.github.com/user?foo=bar&baz=qux.

#### `body` (optional)

The body to include in the request, in JSON format.

```javascript
body: {
  foo: 'bar',
  baz: 'qux'
}
```

#### `headers` (optional)

Overrides the default headers to be sent with the request.

```javascript
headers: {
  'Accept': 'application/json',
  'User-Agent': 'My app name'
}
```

#### `auth` (optional)

Whether to authenticate the request. Defaults to `false`.

```javascript
auth: true
```
