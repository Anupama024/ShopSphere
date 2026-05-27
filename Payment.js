import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  card: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, required: true },
  productId: { type: Number },
  cartItems: [{
    id: Number,
    name: String,
    company: String,
    price: String,
    quantity: Number,
    selectedSize: String,
    src: String
  }],
  paymentStatus: { type: String, default: 'completed', enum: ['pending', 'completed', 'failed'] },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
