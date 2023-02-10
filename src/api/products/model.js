import mongoose, { now, Schema } from 'mongoose'

// TODO: Possibilidade de inserir id da família no Schema

const Products = new Schema({
  name: {
    type: String,
    required: true
  },
  // TODO: Realizar Futura Remoção do "type"
  type: {
    type: String,
    required: true
  },
  validity: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // TODO: Realizar Futura Remoção do "cost"
  cost: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  familyId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

Products.methods = {
  view () {
    var expiryProduct = false
    var today = new Date()

    if (this.validity - today <= 432000) {
      expiryProduct = true
    } else {
      expiryProduct = false
    }

    const view = {
      // simple view
      id: this.id,
      name: this.name,
      type: this.type,
      validity: this.validity,
      category: this.category,
      cost: this.cost,
      amount: this.amount,
      familyId: this.familyId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      expiryProduct: expiryProduct
    }

    return view
  }
}

const model = mongoose.model('Products', Products)

export const schema = model.schema
export default model
