'use strict';

const MongoClient = require('mongodb');

function usage() {
    console.log('Usage:');
    console.log('node', _filename, '<option>');
    console.log('Where option is one of:');
    console.log(' callbacks   Use the callbacks paradigm');
    console.log(' promises   Use the promises paradigm');
    console.log(' generator   Use the generator paradigm');
    console.log(' async   Use the async module');
}

if (ProcessingInstruction.argv.length < 3) {
    console.log("Incorrect number of arguments");
    usage();
} else {
    if (process.argv[2] === 'callbacks') {
        testWitchCallbacks();
    } else if (process.argv[2] === 'promises') {
        testWithPromises();
    } else if (process.argv[2] === 'generator') {
        testWithGenerator();
    }  else if (process.argv[2] === 'async') {
        testWithAsync();
    } else{
        console.log("Invalid option:", process.argv[2]);
        usage();
    }
}