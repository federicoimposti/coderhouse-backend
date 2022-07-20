const express = require('express');
const productsRouter = express.Router();

const controller = require('../controller');

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
    const product = controller.save(req.body);
    res.status(201).send(product);
  });

  productsRouter.put("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.update(productId, req.body);
    res.status(201).send(product);
  });

module.exports = productsRouter;