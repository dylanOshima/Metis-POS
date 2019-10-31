//Holds connection information to MongoDB

let mongoDB;
try {
  const config = require('../config.js');
  mongoDB = config.mongoDB;
} catch {
  console.error("No config file located");
}
var url = require('url');
var uri = mongoDB ? `mongodb+srv://${mongoDB.account}:${mongoDB.password}@metis-0-pjyqg.azure.mongodb.net/test?retryWrites=true&w=majority`
:'mongodb://localhost:27017/restaurant';

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

