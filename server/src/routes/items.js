const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', (req, res, next) => {
  Item.find({}, (err, result) => {
    if (err) {
      res.status(400).send({
        found: false,
        error: err.message,
      });
    }
    res.status(200).send({
      found: true,
      items: result,
    });
  });
});

router.get('/:id', async (req, res) => {
  Item.findOne({ id: req.params.id }, (err, result) => {
    if (err) {
      res.status(400).send({
        found: false,
        error: err.message,
      });
    }
    res.status(200).send({
      found: true,
      item: result,
    });
  });
});

router.post('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  let item = new Item({
    id: req.params.id,
    name,
    price,
    quantity,
  });
  Item.create(item, (err, result) => {
    if (err) {
      res.status(400).send({
        created: false,
        error: err.message,
      });
    }
    res.status(200).send({
      created: true,
      item: item,
      message: 'Item created successfully.',
    });
  });
});

router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  const newItem = {
    id: req.params.id,
    name,
    price,
    quantity,
  };
  let item = await Item.findOne({ id: req.params.id });
  Item.findByIdAndUpdate(
    item._id,
    {
      $set: newItem,
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).send({
          updated: false,
          error: err.message,
        });
      }
      res.status(200).send({
        updated: true,
        item: result,
        message: 'Item updated successfully.',
      });
    }
  );
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const item = await Item.findOne({ id: id });
  Item.findByIdAndDelete(item._id, (err, result) => {
    if (err) {
      res.status(400).send({
        deleted: false,
        error: err.message,
      });
    }
    res.status(200).send({
      deleted: true,
      message: 'Item deleted successfully.',
    });
  });
});

module.exports = router;
