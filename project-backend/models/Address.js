
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  phone: String,
  pincode: String,
  state: String,
  city: String,
  addressLine: String,
  landmark: String,
  addressType: { type: String, default: 'Home' },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);

