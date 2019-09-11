const express = require("express");
const mainRouter = require("./main-router");
const product = require('./product/Product-router');
const idProduct = require('./product/get-product-id');
const createUser = require('./user/create-user');
const getUser = require('./user/get-user');
const createOrders = require('./orders/create-order');

const router = express.Router();

router
    .get("/products/:id", idProduct)
    .get("/products", product)
    .post("/users", createUser)
    .post('/orders', createOrders)
    .get("/users/:userID", getUser)
    .get("/", mainRouter);


module.exports = router;