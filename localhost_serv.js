const http = require('http');
const {log} = console

const server = http.createServer();
    server.on('request', (request, response) => {
        const { method, url } = request;
        log(method, url)
});
