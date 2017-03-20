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
var http = require('follow-redirects').http,
    https = require('follow-redirects').https,
    ul = require('ul'),
    url = require('url'),
    queryString = require('querystring'),
    events = require('events'),
    EventEmitter = events.EventEmitter;

module.exports = function easyRequest(options, callback) {

	// deal with options
	if (typeof options === 'string') {
		options = {
			url: options
		};
	}

	options = ul.deepMerge(options, ul.clone(url.parse(options.url || '')), {
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

	// deal with callback
	var _done = false;
	var opt_callback = function(err, data, res) {
		if (_done) { return; }
		_done = true;
		if (typeof callback !== 'function') { return; }
		callback(err, data, res);
	};

	var str = new EventEmitter();

	var request = (options.protocol === 'http:' ? http : https).request(options, function(res) {
		options.encoding && res.setEncoding(options.encoding);
		var body = [], bodyLength = 0;

		if (typeof callback === 'function') {
			res.on('data', function(data) {
				body.push(data);
				bodyLength += data.length;
			});
		}

		res.on('data', function(data) {
			str.emit('data', data);
		}).on('error', function(e) {
			str.emit('error', e);
			opt_callback(e, null, res);
		}).on('end', function() {
			str.emit('end');
			body = options.encoding === null || 
				options.encoding === 'buffer' ? Buffer.concat(body, bodyLength) : body.join("");
			opt_callback(null, body, res);
		});
	}).on('error', function(e) {
		opt_callback(e, null, null);
	});

	// deal with the post data
	if (options.data) {
		request.write(options.data, options.data_encoding);
	}

	request.end();
	
	return str;
};




