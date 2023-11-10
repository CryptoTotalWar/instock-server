// warehouse.js
const express = require("express");
const warehouseControler = require('../controllers/warehouse-controller');

const router = express.Router();

// GET list of all warehouses
router.get('/', warehouseControler.getAllWarehouses);

// GET single warehouse
router.get('/:id', warehouseControler.findWarehouse);


// POST to add new warehouse
router.post("/:id", (req, res) => {
  res.status(200).json({});
});

// PUT to edit a single warehouse
router.put("/:id", warehouseControler.editWarehouse)

// DELETE warehouse with id
router.delete("/:id", warehouseControler.deleteWarehouse);

module.exports = router;
