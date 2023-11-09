// routes/inventory.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

// GET list of all inventory
router.get("/", inventoryController.getAllInventoryItems);

// GET single inventory item
router.get("/:id", inventoryController.getSingleInventoryItem);

// POST to add new inventory item
router.post("/", inventoryController.addInventoryItem);

// PUT to edit a single inventory item
router.put("/:id", inventoryController.updateInventoryItem);

// DELETE inventory item with id
router.delete("/:id", inventoryController.deleteInventoryItem);

module.exports = router;
