/*
 * Primary file in the API
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

//Instantiate the http server
var httpServer = http.createServer(function (req, res) {
    unifiedServer(req, res);
});

//Start the server
httpServer.listen(config.httpPort, function () {
    console.log(`The server is listening on port ${config.httpPort}`);
});

//Instantiate the https server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    unifiedServer(req, res);
});

//Start the https server
httpsServer.listen(config.httpsPort, function () {
    console.log(`The server is listening on port ${config.httpsPort}`);
});

//create a method for handling both the http and the https servers
var unifiedServer = function (req, res) {
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
    var payload = '';
    req.on('data', function (data) {
        payload += decoder.write(data);
    });
    req.on('end', function () {
        payload += decoder.end();

        //choose the handler for this endpoint. If a handler for it does not exist, use the notFound handler
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryString': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJSONToObject(payload)
        }

        //route the request to the router specified in the router
        console.log(JSON.stringify(data));
        chosenHandler(data, function (statusCode, payload) {
            console.log(JSON.stringify(payload));
            //use the status code called back by the handler or the default one
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            //use the payload returned by the handler, or use an empty one
            payload = typeof (payload) == 'object' ? payload : {};

            //convert the payload to a string
            var payloadString = JSON.stringify(payload);

            //return the response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log(`Returning this response: ${statusCode} -- ${payloadString}`);
        });
    });
};


//define a router, for handling more requests
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users
};
