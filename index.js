
var statuses = require('statuses');

module.exports = function ({stack = true, log = true, suppressServer = true} = {}) {
  return function apiErrorHandler(err, req, res, next) {
    var status = err.status || err.statusCode || 500;
    if (status < 400) status = 500;
    res.statusCode = status;

    var body = {
      status: status
    };

    // show the stacktrace when not suppressed by stack option
    if (stack) body.stack = err.stack;

    // internal server errors
    if (status >= 500 && suppressServer) {
      if (log === true || log === 'server') console.error(err.stack);
      body.message = statuses[status];
      res.json(body);
      return;
    }

    // client errors
    body.message = err.message;

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    // extra params
    if (err.extra) Object.assign(body, err.extra)

    if (log) console.error(err)

    res.json(body);
  }
}
