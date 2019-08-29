const http = require('http');
const url = require('url');
const router = require('../routes/router')

const server = http.createServer((request, response) => {
    const newUrl = url.parse(request.url);
    if (newUrl.pathname.includes('/products')) {
        const activeLink = router['/products'];
        activeLink(request, response)
    }
    // else if () { const activeLink = router['/products'];
    // activeLink(request, response)}
    else {
        const activeLink = router.default;
        activeLink(request, response)
    }

}).listen(3000)

module.exports = server

