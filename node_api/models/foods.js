import mongoose from "mongoose";

const foods = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('foods', foods)