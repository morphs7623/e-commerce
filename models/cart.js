const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true},
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
