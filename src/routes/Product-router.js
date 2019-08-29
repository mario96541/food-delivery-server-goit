const fs = require("fs");
const path = require("path");
const url = require("url");
const getID = require("../helpers/id-helper");


const productRouter = (request, response) => {
    const pathFile = path.join(__dirname, '../', 'db', 'products', 'all-products.json');
    const parseUrl = url.parse(request.url);
    const id = getID(parseUrl.pathname);
    if (Number(id) && parseUrl.query === null) {
        fs.readFile(pathFile, (error, data) => {
            if (error) {
                response.statusCode = 404;
                response.end("Products not found!");
            }
            const parseData = JSON.parse(data);
            const filterID = parseData.filter(item => item.id === Number(id));
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ "status": "success", "products": filterID }));

        })
    }

    if (!Number(id) && parseUrl.query === null) {
        fs.readFile(pathFile, (error, data) => {
            if (error) {
                response.statusCode = 404;
                response.end("Products not found!");
            }
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.write(data);
            response.end();
        })
    }
    if (parseUrl.query !== null && parseUrl.query.includes("ids")) {
        const ids = parseUrl.query.split("%27");
        const query = ids[1];
        const splitQuery = query.split(",");
        const newData = [];
        fs.readFile(pathFile, (error, data) => {
            if (error) {
                response.statusCode = 404;
                response.end("Products not found!");
            }
            const parseData = JSON.parse(data);
            parseData.filter(item => {
                for (let el of splitQuery) {
                    if (Number(el) === item.id) {
                        newData.push(item);
                    }
                }
                return newData;
            });
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ products: newData }));
            response.end();
        });
    }
    if (parseUrl.query !== null && parseUrl.query.includes("category")) {
        const category = parseUrl.query.split("%27");
        const query = category[1];
        const splitQuery = query.split(",");
        const newData = [];
        fs.readFile(pathFile, (error, data) => {
            if (error) {
                response.statusCode = 404;
                response.end("Products not found!");
            }
            const parseData = JSON.parse(data);
            parseData.filter(item => {
                for (let el of splitQuery) {
                    if (el === item.categories[0]) {
                        newData.push(item);
                    }
                }
                return newData;
            });
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ products: newData }));
            response.end();
        });
    }
};
module.exports = productRouter;