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
    const inventoryItems = await knex('inventories')
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .select('inventories.*', 'warehouses.warehouse_name');
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving inventory items: ${error.message}` });
  }
};

// Skeleton for getting a single inventory item
const getSingleInventoryItem = async (req, res) => {
  // Placeholder for logic to get a single inventory item by id
  // To be implemented by teammate
  try {
    const itemFound = await knex("inventories")
      .where({ id: req.params.id });

    if (itemFound.length === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`
      });
    }
    const itemData = itemFound[0];
    res.json(itemData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve item data for item with ID ${req.params.id}`,
    });
  }
};


// Skeleton for updating an inventory item
const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // Validate all fields are provided
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    isNaN(quantity)
  ) {
    return res
      .status(400)
      .json({
        message: "All fields are required and quantity must be a number",
      });
  }

  // Check if the inventory item exists
  const item = await knex("inventories").where({ id }).first();
  if (!item) {
    return res.status(404).json({ message: "Inventory item not found" });
  }

  // Check if the warehouse_id exists
  const warehouse = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();
  if (!warehouse) {
    return res.status(400).json({ message: "Warehouse ID does not exist" });
  }

  // Proceed to update
  try {
    await knex("inventories")
      .where({ id })
      .update({
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      });
    const updatedItem = await knex("inventories").where({ id }).first();
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating inventory: ${error.message}` });
  }
};

  const deleteInventoryItem = async (req, res) => {
    const { id } = req.params;

    try {
      const inventory = await knex('inventories').where({ id }).first();
      if (!inventory) {
        return res.status(404).json({ message: "Inventory ID does not exist" });
      }

      await knex.transaction(async (trx) => {
        await trx('inventories').where({ id }).del();
      });

      return res.status(204).json({message: 'successfully deleted'}); 
    } catch (error) {
      return res.status(500).send(); 
    }
  };


module.exports = {
  addInventoryItem,
  getAllInventoryItems,
  getSingleInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
