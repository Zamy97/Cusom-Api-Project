const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.model.js');


// Get Customers
router.get('/api/customers', async (req, res) => {
    try{
        const customers = await Customer.find({});
        res.send(customers);
    } catch(err) {
        return err.message
    }
});

// Add customer
router.post('/api/customers', async (req, res) => {
    // check for json
    if(!req.is('application/json')) {
        return err.message
    }

    const { name, email, balance } = req.body;

    const customer = new Customer({
        name,
        email,
        balance
    });

    try {
        const newCustomer = await customer.save();
        res.send(201);
    } catch(err) {
        return err.message
    }
});


module.exports = router;
