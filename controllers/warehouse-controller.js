const knex = require('knex')(require('../knexfile'))


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
};
