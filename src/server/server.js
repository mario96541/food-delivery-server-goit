const http = require('http');
const url = require('url');
const router = require('../routes/route');

const server = port => {
    const createNewServer = http.createServer((request, response) => {

        const parseUrl = url.parse(request.url);
        const activeRouter = router[parseUrl.pathname]
        activeRouter(request, response)
    })

    createNewServer.listen(port);
}

module.exports = server;

