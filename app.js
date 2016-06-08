var express = require('express');
var app = express();

app.use(express.static('.', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }))

app.set('port', process.env.PORT || 3000);



module.exports = app;