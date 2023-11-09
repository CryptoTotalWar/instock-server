const knex = require('knex')(require('../knexfile'))

const index = async (_req, res) => {
    try {
      const data = await knex('warehouses');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
  }
const findWarehouse = async (req, res) => {
    try {
        const warehouseFound = await knex('warehouses')
        .where({id: req.params.id});
    
    if (warehouseFound.length === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found` 
        });
      }
  
      const warehouseData = warehouseFound[0];
      res.json(warehouseData);
    }   
    catch (error) {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID ${req.params.id}`,
      });
    }
}
// router.get('/:id', warehouseControler.findWarehouse)


module.exports = {
    index,
    findWarehouse,
};
