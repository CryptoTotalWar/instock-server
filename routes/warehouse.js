// warehouse.js
const express = require("express");
const warehouseController = require("../controllers/warehouse-controller");

const router = express.Router();

// GET list of all warehouses
router.get("/", warehouseController.getAllWarehouses);

// GET single warehouse
router.get("/:id", warehouseController.findWarehouse);

// POST to add new warehouse
router.post("/:id", (req, res) => {
  res.status(200).json({});
});

// PUT to edit a single warehouse
router.put("/:id", warehouseController.editWarehouse);

// DELETE warehouse with id
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
