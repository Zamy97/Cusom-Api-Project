const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model.js');


// Get Customers
router.get('/api/customers', async (req, res) => {
    try{
        const customers = await Customer.find({});
        res.send(customers);
    } catch(err) {
        return err.message
    }
});

// GET single customer
router.get('/api/customers/:_id', async (req, res) => {
    try{
        const customer = await Customer.findById(req.params._id);
        res.send(customer);
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
        res.sendStatus(201);
    } catch(err) {
        return err.message
    }
});

// Update customer

router.put('/api/customers/:_id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate( {_id: req.params._id }, req.body);
        res.sendStatus(200);
    } catch {
        return err.message
    }
});

// Delete Customer

router.delete('/api/customers/:_id', async (req, res) => {
    try{
        const customer = await Customer.findOneAndRemove({ _id: req.params._id });
        res.sendStatus(204);
    } catch {
        return err.message
    }
});

module.exports = router;
