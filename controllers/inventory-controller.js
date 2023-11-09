// controllers/inventory-controller.js
const knex = require("knex")(require("../knexfile"));

const addInventoryItem = async (req, res) => {
  // Destructure and validate request body
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({ message: "Quantity must be a number" });
  }

  try {
    // Insert the new item
    const [newItemId] = await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity: parseInt(quantity, 10),
    });

    // Retrieve the new item to return in response
    const newItem = await knex("inventories").where({ id: newItemId }).first();
    res.status(201).json(newItem);
  } catch (error) {
    // Handle potential errors, such as warehouse_id not existing
    res
      .status(400)
      .json({ message: `Error adding inventory: ${error.message}` });
  }
};

// Skeleton for getting all inventory items
const getAllInventoryItems = async (req, res) => {
    try {
      const inventoryItems = await knex('inventories').select('*');
      res.json(inventoryItems);
    } catch (error) {
      res.status(500).json({ message: `Error retrieving inventory items: ${error.message}` });
    }
};

const getInventoryByWarehouse = async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const inventory = await knex('inventories')
      .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
      .where('warehouses.id', warehouseId)
      .select('inventories.*', 'warehouses.name as warehouse');
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Skeleton for getting a single inventory item
const getSingleInventoryItem = async (req, res) => {
  // Placeholder for logic to get a single inventory item by id
  // To be implemented by teammate
};

// Skeleton for updating an inventory item
const updateInventoryItem = async (req, res) => {
  // Placeholder for logic to update a single inventory item by id
  // To be implemented by teammate
};

// Skeleton for deleting an inventory item
const deleteInventoryItem = async (req, res) => {
    const itemId = req.params.id;
    try {
      const numberOfDeletedRows = await knex('inventories').where('id', itemId).del();
      if (numberOfDeletedRows) {
        res.status(204).send(); // No content to send back
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: `Error deleting inventory item: ${error.message}` });
    }
};

module.exports = {
  addInventoryItem,
  getAllInventoryItems,
  getSingleInventoryItem,
  getInventoryByWarehouse,
  updateInventoryItem,
  deleteInventoryItem,
};
