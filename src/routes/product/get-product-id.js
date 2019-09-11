const path = require("path");
const fs = require("fs");

const idProduct = (request, response) => {
  const src = path.join(__dirname, "../../", 'db',"products", "all-products.json");
  const id = request.params.id;

  fs.readFile(src, (error, data) => {
    const parseData = JSON.parse(data);
    const fuilterID = parseData.filter(item => item.id === Number(id));
    const respObj = fuilterID.length
      ? { status: "success", fuilterID }
      : { status: "no products", products: [] };
    response.set("Content-Type", "application/json");
    response.status(200);
    response.json(respObj);
  });
};
module.exports = idProduct;