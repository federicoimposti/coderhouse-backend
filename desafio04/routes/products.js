const express = require('express');
const productsRouter = express.Router();

const controller = require('../controller');

const error = { error: 'Producto no encontrado' }

productsRouter.get("/", (req, res) => {
    const products = controller.getAll();
    res.send(products);
  });

  productsRouter.get("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.getById(productId);

    if(product){
      res.send(product);
    } else {
      res.send(error)
    }
  });

  productsRouter.delete("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.getById(productId);

    if(product) {
      controller.deleteById(productId);
      res.send(`Producto ${productId} eliminado`);
    } else {
      res.send(error);
    }
  });

  productsRouter.post("/", (req, res) => {
    const product = controller.save(req.body);
    res.status(201).send(product);
  });

  productsRouter.put("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const product = controller.getById(productId);

    if(product){
      controller.update(productId, req.body);
      res.status(201).send(product);
    } else {
      res.send(error);
    }
  });

module.exports = productsRouter;