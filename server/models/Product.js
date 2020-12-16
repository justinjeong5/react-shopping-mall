const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    maxLength: 50
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  },
  sort: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  }
}, { timestamp: true })

productSchema.index({
  title: 'text',
  description: 'text',
}, {
  weight: {
    title: 5,
    description: 1,
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = { Product }