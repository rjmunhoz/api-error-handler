
# api-error-handler-revived

[![NPM](https://nodei.co/npm/api-error-handler-revived.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/api-error-handler-revived/) [![NPM](https://nodei.co/npm-dl/api-error-handler-revived.png?months=1)](https://nodei.co/npm/api-error-handler-revived/)

Forked from [api-error-handler](https://github.com/expressjs/api-error-handler) since there were unmerged 2016 pull requests

An error handler for JSON APIs, meant to be used with [http-errors](https://github.com/jshttp/http-errors)-style errors.

## Installation
`npm i api-error-handler-revived`

## Example

```js
var errorHandler = require('api-error-handler-revived');

var api = new express.Router();
api.get('/users/:userid', function (req, res, next) {

});

api.use(errorHandler());

app.use('/api', api);
```

## API

### .use(errorHandler([options]))

#### Options:
- `stack`:
  - Description: Wether to show or not the stacktrace
  - Default: `true`
- `log`
  - Description: Wether to `console.error` the error object
  - Default: `true`
- `suppressServer`
  - Description: Wether to supress serverside (5xx) errors with a generic message
  - Default: `true`

### Extra params
If you need to expose any other params, pass an `extra` property to the `http-errors` properties parameter:
```js
createError(400, `There were errors validating sent data`, {extra: {errors: validationErrors}})
```

### Errors

4xx errors are exposed to the client.
Properties exposed are:

- `message`
- `type`
- `name`
- `code`
- `status`
- `extra` properties

5xx errors are, by default, not exposed to the client.
Instead, they are given a generic `message` as well as the `type`.
