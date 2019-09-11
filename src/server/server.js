const express = require('express');
const router = require('../routes/route');
const bodyParser = require("body-parser");
const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/", router)
  .use(errorHandler);


app.listen(3000)




