// warehouse.js
const express = require("express");
const warehouseController = require("../controllers/warehouse-controller");
const knex = require("knex")(require("../knexfile"));

const router = express.Router();

// GET list of all warehouses
router.get("/", warehouseController.getAllWarehouses);

// GET single warehouse
router.get("/:id", warehouseController.findWarehouse);

// POST to add new warehouse
router.post("/", warehouseController.addNewWarehouse);

// PUT to edit a single warehouse
router.put("/:id", warehouseController.editWarehouse);

// DELETE warehouse with id
router.delete("/:id", warehouseController.deleteWarehouse);

// In warehouse.js
router.get("/:id/inventories", async (req, res) => {
  try {
    console.log("Accessing inventories for warehouse with ID:", req.params.id);
      const warehouseId = req.params.id;
      console.log("Fetching inventory for warehouse ID:", warehouseId); 
      const inventoryItems = await knex("inventories")
          .where({ warehouse_id: warehouseId });
      console.log("Inventory items:", inventoryItems); 
      res.json(inventoryItems);
  } catch (error) {
      res.status(500).json({ message: `Error retrieving inventory for warehouse ${req.params.id}: ${error.message}` });
  }
});


module.exports = router;
