// controllers/warehouse-controller.js
const knex = require('knex')(require('../knexfile'))

const editWarehouse = async (req, res) => {
    const { id } = req.params;
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;
  
    if (
      !id ||
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const updatedRows = await knex('warehouses')
        .where({ id: id })
        .update({
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email,
        });
  
      if (updatedRows > 0) {
        const updatedWarehouse = await knex('warehouses').where({ id: id }).first();
        res.status(200).json(updatedWarehouse);
      } else {
        res.status(404).json({ message: `Warehouse with ID ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: `Error updating warehouse: ${error}` });
    }
  };
  

const findWarehouse = async (req, res) => {
    try {
        const warehouseFound = await knex('warehouses')
        .where({id: req.params.id});
    
    if (warehouseFound.length === 0) {
        return res.status(404).json({
          message: `Warehouse with ID ${req.params.id} not found` 
        });
      }
  
      const warehouseData = warehouseFound[0];
      res.json(warehouseData);
    }   
    catch (error) {
      res.status(500).json({
        message: `Unable to retrieve warehouses data for warehouse with ID ${req.params.id}: ${error}`,
      });
    }
}

const deleteWarehouse = async (req, res) => {
  const { id } = req.params;

  try {
    const warehouse = await knex('warehouses').where({ id }).first();
    if (!warehouse) {
      return res.status(404).send(); 
    }

    await knex.transaction(async (trx) => {
      await trx('inventories').where({ warehouse_id: id }).del();
      await trx('warehouses').where({ id }).del();
    });

    return res.status(204).send(); 
  } catch (error) {
    
    return res.status(500).send(); 
  }
};

const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await knex('warehouses').select('*');
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving warehouses: ${error.message}` });
  }
};

module.exports = {
    findWarehouse,
    editWarehouse,
    getAllWarehouses,
    deleteWarehouse,
};
