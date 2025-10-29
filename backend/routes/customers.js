const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Customer = require('../models/Customer');

// GET /api/customers  -> list for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error(err.message); res.status(500).send('Server error');
  }
});

// POST /api/customers -> create
router.post('/', [ auth, check('name').notEmpty() ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, company, notes } = req.body;
  try {
    const newCustomer = new Customer({
      name, email, phone, company, notes, owner: req.user.id
    });
    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message); res.status(500).send('Server error');
  }
});

// PUT /api/customers/:id -> update
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, company, notes } = req.body;
  const fields = { name, email, phone, company, notes };
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    if (customer.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    customer = await Customer.findByIdAndUpdate(req.params.id, { $set: fields }, { new: true });
    res.json(customer);
  } catch (err) {
    console.error(err.message); res.status(500).send('Server error');
  }
});

// DELETE /api/customers/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    if (customer.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Customer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message); res.status(500).send('Server error');
  }
});

module.exports = router;
