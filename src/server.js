const http = require('http');
const app = require('.');
// port = process.env.PORT || 3000;
port = 3000;

const server = http.createServer(app);

server.listen(port);
