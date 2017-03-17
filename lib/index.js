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




