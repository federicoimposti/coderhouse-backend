const express = require('express');
const controller = require('../controller');

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    const products = controller.getAll();
    res.send(products);
  });

  productsRouter.get("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.getById(productId);
    res.send(product);
  });

  productsRouter.delete("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.deleteById(productId);
    res.send(product);
  });

  productsRouter.post("/", (req, res) => {
    console.log(req.body);
    const tweet = controller.add(req.body.name, req.body.content);
    res.status(201).send(tweet);
  });

module.exports = productsRouter;