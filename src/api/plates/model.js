import mongoose, { Schema } from 'mongoose'

const Plates = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  favorited: {
    type: Boolean,
    required: true
  },
  section: {
    ingredients: [
      {
        ingredients_name: { type: String, required: true },
        ingredients_quantity: { type: String, required: true },
        ingredients_category: { type: Number, required: true },
        ingredients_notes: { type: String, required: false }
      }
    ],
    prepare_mode: {
      type: Array,
      required: true
    },
    extras: {
      type: Array,
      required: true
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

Plates.methods = {
  view () {
    const view = {
      id: this._id,
      image: this.image,
      name: this.nome,
      category: this.category,
      favorited: this.favorited,
      section: this.section
    }
    return view
  }
}

const model = mongoose.model('Plates', Plates)

export const schema = model.schema
export default model
