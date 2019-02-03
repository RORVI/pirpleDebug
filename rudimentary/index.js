/*
 * Primary file in the API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//The server should respond to all requests with a string
var server = http.createServer(function(req, res) {
    //get the url and parse it
    let parsedURL = url.parse(req.url, true);

    //get the path from that url
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string as an object
    var queryStringObject = parsedURL.query;

    //get the http method
    var method = req.method.toLowerCase();

    //get the headers as an object
    var headers = req.headers;

    //get the payload, if there is any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();

        //send the response
        res.end("Hello world\n");

        //log the requested url
        console.log(`${path} --- ${trimmedPath}, method ${method} and query string `, queryStringObject);
        console.log('request payload ', buffer);
    });
});

//Start the server, and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000");
});

//define a handler
var handlers = {};

//sample handlers
handlers.sample = function(data,callback) {
    //callback an http status code, and a payload object
    callback(406,{'name':'sample handler'});
};

//not found handler
handlers.notFound = function(data,callback) {
    callback(404);
};

//define a router, for handling more requests
var router = {
    'sample' : handlers.sample
};