const fs = require('fs');
const path = require('path');



const productRouter = (request, response) => {
    const pathFile = path.join(__dirname, '../', 'db', 'products', 'products.json');
    fs.readFile(pathFile, (error, data) => {
        if (error) throw error;
        console.log(error)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(data);
        response.end()
    })
}
module.exports = productRouter;
