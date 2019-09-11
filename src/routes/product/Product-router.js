const fs = require('fs');
const path = require('path');

const product = (request, response) => {
  const pathFile = path.join(__dirname, "../../", 'db', 'products', "all-products.json");
  console.log(pathFile)
  if (request.url.includes("ids")) {
    const query = request.query.ids;
    const splitQuery = query.split(",");
    const newData = [];
    fs.readFile(pathFile, (error, data) => {
      if (error) throw error;
      const parseData = JSON.parse(data);
      parseData.filter(item => {
        for (let el of splitQuery) {
          if (Number(el) === item.id) {
            newData.push(item);
          }
        }
        return newData;
      });
      const respObj = newData.length
        ? { status: "success", newData }
        : { status: "no products", products: [] };
      response.set("Content-Type", "application/json");
      response.status(200);
      response.json(respObj);
    });
  } else {
    fs.readFile(pathFile, (error, data) => {
      response.set("Content-Type", "application/json");
      response.status(200);
      response.send(data);
    });
  }
};
module.exports = product;
