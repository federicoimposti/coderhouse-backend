const express = require('express');
const productsRouter = express.Router();

const controller = require('../controller');

const error = { error: 'Producto no encontrado' };

productsRouter.get("/", (req, res) => {
    const response = controller.getAll();
    res.send(response);
  });

  productsRouter.get("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const response = controller.getById(productId);

    res.status(200).send(response);
  });

  productsRouter.delete("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const response = controller.deleteById(productId);
    
    res.status(202).send(response);
  });

  productsRouter.post("/", (req, res) => {
    const response = controller.save(req.body);
    res.status(201).send(response);
  });

  productsRouter.put("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);
    const response = controller.update(productId, req.body);
    
    res.status(200).send(response);
  });

module.exports = productsRouter;