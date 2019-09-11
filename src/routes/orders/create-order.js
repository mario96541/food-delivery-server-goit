const fs = require('fs');
const path = require('path');

//const products = path.join(__dirname, "../../", 'db', 'products', "all-products.json");

const createOrders = (request, response) => {
    const orders = request.body;
    const userId = orders.user;
    const order = [];
    const directoryPath = path.join(__dirname, '../../', 'db', 'orders');
    const filePath = path.join(__dirname, '../../', 'db', 'orders', `${userId}.json`);

    fs.stat(filePath, (error, stat) => {
        if (error === null) {
            fs.readFile(filePath, (error, data) => {
                if (error) throw error;
                const userData = JSON.parse(data);
                response.set("Content-Type", "application/json")
                response.status(200);
                response.json({ status: "success", userData });
            })

        }
        else if (error.code === 'ENOENT') {
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) throw err;
            });
            order.push({ ...orders, id: Date.now() })

            fs.writeFile(filePath, JSON.stringify(order), (error) => { if (error) throw error; })
            response.set("Content-Type", "application/json")
            response.status(200);
            response.json({ status: "success", order });
        }
    })

}
module.exports = createOrders
