import BlueBirdPromisse from 'bluebird'
import mongoose, { Schema } from 'mongoose'
import { success, errorHandler } from '../../services/response'

const familySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  plates_favorites: {
    type: Array,
    required: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

familySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      plates_favorites: this.plates_favorites,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return view
  },

  destroyAll () {
    const family = this
    const User = mongoose.model('User')
    const Products = mongoose.model('Products')
    const Family = mongoose.model('Family')

    User.remove({ familyId: family.id })
      .then(() => console.log('[HandOven-Api] Users removed!'))
      .catch(() => {
        return errorHandler('invalid')
      })

    Products.remove({ familyId: family._id })
      .then(() => console.log('[Handoven-Api] Products removed!'))
      .catch(() => {
        return errorHandler('invalid')
      })

    return Family.remove({ _id: family.id })
      .then(() => {
        console.log('[Handoven-Api] Family Destroyed')
        return Promise.resolve(success(200))
      })
  }
}

const model = mongoose.model('Family', familySchema)

export const schema = model.schema
export default model
