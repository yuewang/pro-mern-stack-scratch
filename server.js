const express = require('express');

const app = express();

app.use(express.static('static'));
//app.use(express.static('public')); //changed folder name back to static for tutorial

app.listen(3000, function() {
    console.log('App started on port 3000');
});