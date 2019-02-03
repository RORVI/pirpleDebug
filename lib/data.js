/**
 * This is the library for storing and editing data
 */

 //dependencies
 const fs = require('fs');
 const path = require('path');

 //creating the container for this module
 let lib = {};

 //the path for the data folder
 lib.baseDir = path.join(__dirname, '/../.data/');

 //for writing data to a file
 /**
  * dir -> the directory where the file in which we wish to write data is located
  * file -> the file where the data will be written
  * data -> the data to be written in the file
  */
 lib.create = function(dir, file, data, callback) {
     //open the file for writing
     fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', function(err, fileDescriptor){
         if(!err && fileDescriptor) {
            //convert the data to a string, so that it can be written to the file
            let stringData = JSON.stringify(data);

            //write to the file
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if(!err) {
                    fs.close(fileDescriptor, function(err) {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error when closing the new file');
                        }
                    })
                } else {
                    callback('Error wappeared while writing to the new file');
                }
            });
         } else {
             callback(`Could not create the new file! It may already exist!`);
         }
     });
 };

 //for reading data from a file
 lib.read = function(dir, file, callback) {
    fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf8', function(err, data) {
        callback(err, data);
    });
 };

 //for updating the contents of a file (overwrite)
 lib.update = function(dir, file, data, callback) {
    //open the file for writing
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', function(err, fileDescriptor){
        if(!err && fileDescriptor) {
            //convert the data to a string, so that it can be written to the file
            let stringData = JSON.stringify(data);

            //truncate the contents of the file, before writing on top of it
            fs.truncate(fileDescriptor, function(err) {
                if(err) {
                    callback('Error when truncating the existing contents of the file!');
                } else {
                    //write to the file, then close it
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if(!err) {
                            fs.close(fileDescriptor, function(err) {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback(`Error when closing the updated file after writing to it: ${err}`);
                                }
                            });
                        } else {
                            callback('Error when trying to write in the existing file');
                        }
                    });
                }
            });
        } else {
            callback('Could not open the file for the update operation! It may not exist!');
        }
    });
 };

 //for deleting the contents of a file
 lib.delete = function (dir, file, callback) {
    //unlink the file
    fs.unlink(`${lib.baseDir}${dir}/${file}.json`, function(err){
        if(!err) {
            callback(false);
        } else {
            callback('Error while trying to delete the file');
        }
    });
 };

 //expose the module to the system
 module.exports = lib;