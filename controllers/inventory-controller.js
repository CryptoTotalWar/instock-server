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
  // Placeholder for logic to get all inventory items
  // To be implemented by teammate
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
  // Placeholder for logic to delete a single inventory item by id
  // To be implemented by teammate
};

module.exports = {
  addInventoryItem,
  getAllInventoryItems,
  getSingleInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
