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
}
