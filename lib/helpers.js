/**
 * helpers for various tasks
 */

 //dependencies
 const crypto = require('crypto');
 const config = require('../config');

 //the containers for all the helpers
 var helpers = {};

 helpers.hash = function(data) {
    if(typeof(data) === 'string' && data.length > 0) {
        let hash = crypto.createHmac('sha256', config.hashingSecret).update(data).digest('hex');
        return hash;
    } else {
        return false;
    }
 };

 //parse a json string into an object, covering all cases
 helpers.parseJSONToObject = function(str) {
    try {
        let obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
 };

 module.exports = helpers;