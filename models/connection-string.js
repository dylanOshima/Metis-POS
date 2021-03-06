//Holds connection information to MongoDB
const path = require('path');
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

var url = require('url');
var uri = process.env.DEVELOPMENT ? 'mongodb://localhost:27017/restaurant' :
  `mongodb+srv://${process.env.mongoDB_account}:${process.env.mongoDB_password}@metis-0-pjyqg.azure.mongodb.net/test?retryWrites=true&w=majority`;

if (!uri) {
  throw new Error(
    '\033[31mYou need to provide the connection string. ' +
    'You can open "models/connection-string.js" and export it or use the "setUri" command.\033[0m'
  );
}

//verifies the mongo url
var uriObj = url.parse(uri);
if (!/^mongodb/.test(uriObj.protocol)) {
  throw new Error('Must be a mongodb URI')
}
if (!uriObj.host || !uriObj.path) {
  throw new Error('Improperly formatted URI')
}

module.exports = uri;

