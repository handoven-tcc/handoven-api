import mongoose, { Schema } from 'mongoose'

const familySchema = new Schema({
  name: {
    type: String,
    required: true
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return view
  }
}

const model = mongoose.model('Family', familySchema)

export const schema = model.schema
export default model
