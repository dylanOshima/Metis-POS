const http = require('http');

const { NAME, CODE } = process.env;

const data = JSON.stringify({
  name: NAME || 'admin',
  code: CODE || '2019',
  role: 'admin'
})

const options = {
  hostname: 'localhost',
  port: 4444,
  path: '/servers/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

// Sending the request
const req = http.request(options, (res) => {
  console.log("Creating a new server with name: ", data.name);
  console.log("Code is: ", data.code);
});

req.on('error', (err) => {
  console.error("Error creating new server: ", err);
})
req.write(data)
req.end();