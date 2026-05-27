import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [
    {
      productId: {
        type: Number,
        required: true
      },
      name: String,
      company: String,
      price: String,
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      selectedSize: String,
      image: String,
      src: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Cart', cartSchema);
