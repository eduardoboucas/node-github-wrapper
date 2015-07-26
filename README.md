# GitHub API Wrapper

> A really simple GitHub API wrapper for Node.js

## Installation

```
npm install node-github-wrapper
```

## Initialization

```javascript
var githubAPI = require('node-github-wrapper')({options});
```

Options:

- `appName`: Name of the application. Will be used in the request headers.
- `apiRoot`: Base URL of the GitHub API. Defaults to `https://api.github.com`.
- `headers`: Headers to be sent with all requests. Defaults to: `{'Accept': 'application-json', 'User-Agent': appName}`.

Please note that this library **does not** handle OAuth authorization. If you need to make requests that require authorization, you'll need to handle that separately, using something like [node-oauth](https://github.com/ciaranj/node-oauth) and pass the resulting access token to this library using `setAccessToken()`.

## API

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
