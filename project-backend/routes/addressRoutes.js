const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Address = require('../models/Address');

//  GET all addresses for user
router.get('/', auth, async (req, res) => {
  const addresses = await Address.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ addresses });
});

//  POST new address
router.post('/', auth, async (req, res) => {
  const address = new Address({ ...req.body, userId: req.user.id });
  await address.save();
  res.json({ message: 'Address added successfully' });
});

//  PUT (Update)
router.put('/:id', auth, async (req, res) => {
  await Address.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body);
  res.json({ message: 'Address updated' });
});

//  DELETE
router.delete('/:id', auth, async (req, res) => {
  await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Address deleted' });
});

module.exports = router;
