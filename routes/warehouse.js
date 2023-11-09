const express = require("express");
const warehouseControler = require('../controllers/warehouse-controller');
const router = express.Router();

// GET list of all warehouses
router.get("/", (req, res) => {
  res.status(200).json({});
});

// GET single warehouse
router.get('/:id', warehouseControler.findWarehouse)


// POST to add new warehouse
router.post("/:id", (req, res) => {
  res.status(200).json({});
});

// PUT to edit a single warehouse
router.put("/:id", (req, res) => {
  res.status(200).json({});
});

// DELETE warehouse with id
router.delete("/:id", (req, res) => {
  res.status(200).json({});
});

module.exports = router;
