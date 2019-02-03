/**
 * this contains the request handlers
 */

//dependencies
const _data = require('./data');
const helpers = require('./helpers');

//define the handlers
var handlers = {};

//users handler
handlers.users = function(data, callback) {
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

//container for the users submethods 
handlers._users = {};

//users - post
//required data: firstName, lastName, phone, password, tosAgreement
//optional data: none
handlers._users.post = function(data, callback) {
    //check that all the required fields are filled out
    let firstName = typeOf(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName = typeOf(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let phone= typeOf(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    let password = typeOf(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    let tosAgreement = typeOf(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        //make sure that the user doesn't already exist
        _data.read('users', phone, function(err, data) {
            if(err) {
                //hash the password
                let hashedPassword = helpers.hash(password);

                if(hashedPassword) {
                    //create the user object
                    let userObject = {
                        'firstName' : firstName,
                        'lastName' : lastName,
                        'phone' : phone,
                        'hashedPassword' : hashedPassword,
                        'tosAgreement' : true,
                    };

                    //store the user data
                    _data.create('users', phone, userObject, function(err) {
                        if(!err) {
                            console.log('entered here');
                            callback(200);
                        } else {
                            console.log('entered here');
                            console.log(err);
                            callback(500, {'Error' : 'Could not create the new user'});
                        }
                    });
                } else {
                    console.log('entered here');
                    callback(500, {'Error' : 'Could not hash the user\'s password'});
                }
            } else {
                console.log('entered here');
                callback(400, {'Error' : 'The user with this phone number already exists'});
            }
        });
    } else {
        console.log('entered here');
        callback(400, {'Error' : 'missing required fields'});
    }
};

//users - get
//required data: 
//optional data:
handlers._users.get= function(data, callback) {

};

//users - put
//required data:
//optional data:
handlers._users.put = function(data, callback) {

};

//users - delete
//required data:
//optional data:
handlers._users.delete = function(data, callback) {

};

//ping handler
handlers.ping = function (data, callback) {
    callback(200);
};

//not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};

//expose the handlers to the outside world
module.expose = handlers;