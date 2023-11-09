const express = require("express");
const inventoryController = require("../controllers/inventory-controller");
const warehouseControler = require('../controllers/warehouse-controller');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))

// GET list of all warehouses
router.get("/", (req, res) => {
  res.status(200).json({});
});

// GET single warehouse
router.get('/:id', warehouseControler.findWarehouse)


// GET inventory for a specific warehouse
router.get("/:id/inventory", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const inventory = await knex('inventories')
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .where({'warehouses.id': warehouseId})
      .select('inventories.id', 'item_name', 'description', 'category', 'status', 'quantity');
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

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
