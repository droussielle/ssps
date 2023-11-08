const http = require('http');
const app = require('./index');
port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
