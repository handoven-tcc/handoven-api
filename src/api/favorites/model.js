import mongoose, { Schema } from 'mongoose'

const Favorites = new Schema({
  plateId: {
    type: Schema.Types.ObjectId,
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

Favorites.methods = {
  view () {
    const view = {
      id: this._id,
      plateId: this.plateId,
      familyId: this.familyId
    }
    return view
  }
}

const model = mongoose.model('Favorites', Favorites)

export const schema = model.schema
export default model
