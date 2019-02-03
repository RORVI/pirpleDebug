/**
 * this will contain the confguration variables for the application
 */

var environments = {};

environments.staging = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' :'staging',
    'hashingSecret' : 'thisIsTheHashingSecret'
};

environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' :'production',
    'hashingSecret' : 'thisIsTheHashingSecret'
};

//determine which environment settings will be used via the passed command line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';
console.log(`The argument provided on starting the app is ${process.env.NODE_ENV}`);

//check that the current environment actually exists and if it does not, use staging as the default
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//expose the module
module.exports = environmentToExport;
