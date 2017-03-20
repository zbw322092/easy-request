/*
the native node.js http request act likes that:
var options = { something }
var req =  http.request(options, (res) => { something });
req.write(some data);
req.end();

We would like to make this operation more simple and more intuitive.
We want codes similar to this:
easyRequest(options, cb);
We need to make an abstraction and encapasulation based on native node.js http request code.
*/
var http = reuqire('follow-redirects').http,
    https = reuqire('follow-redirects').https,
    ul = require('ul'),
    url = require('url'),
    queryString = require('querystring'),
    events = require('events'),
    EventEmitter = events.EventEmitter;

module.exports = function easyRequest() {

	// deal with options
	if (typeof options === 'string') {
		options = {
			url: options
		};
	}

	options = ul.deepMerge(options, ul.clone(url.parse(options.url)), {
        method: options.method
              ? options.method
              : options.data
                ? "POST" : "GET"
      , headers: {}
      , encoding: "utf8"
	});

	// deal with post data
	if (options.data && options.data.constructor === Object) {
		options.data === queryString.stringify(options.data);
	}

	if (typeof options.data === 'string') {
		options.headers['Content-Length'] = Buffer.byteLength(options.data);
	}

	


};




