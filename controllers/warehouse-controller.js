const knex = require('knex')(require('../knexfile'))

const editWarehouse = async () => {
    const { id, warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email} 
    = req.body;

    if (
        !id || !warehouse_name || !address || !city ||
        !country ||  !contact_name ||
        !contact_position || !contact_phone||
        !contact_email
    ){
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Update the warehouse data in the database
        const updatedRows = await knex('warehouse')
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
          // Fetch and send the updated warehouse data
          const updatedWarehouse = await knex('warehouse').where({ id: id }).first();
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

module.exports = {
    findWarehouse,
    editWarehouse,
};
