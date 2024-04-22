const { webApp } = require('./functions/index'); 

const functions = require('firebase-functions');

exports.webApp = functions.https.onRequest(webApp);
