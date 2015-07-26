Node GitHub Wrapper

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

## Usage

### `.setAccessToken(token)`