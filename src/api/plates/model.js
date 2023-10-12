import mongoose, { Schema } from 'mongoose'
import { algorithm } from '../../services/algorithm'

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
      name: this.name,
      category: this.category,
      favorited: this.favorited,
      section: this.section
    }
    return view
  },
  algorithm(familyId) {
      const ProductsModel = mongoose.model('Products')
      const PlatesModel = mongoose.model('Plates')

      try {
          const Products = ProductsModel.find({familyId});
          const Plates = PlatesModel.findAll();
          console.log("familyId: "+familyId)
          console.log("Products: "+JSON.stringify(Products))
          console.log("Plates: "+JSON.stringify(Plates))
          return algorithm(Plates, Products);
      } catch (error) {
          return({
          error: error,
          type: "interal",
          message: "Não foi possível executar o algorítmo, tente novamente mais tarde ou contate a equipe de suporte!"
      })
    }
  }
}

Plates.statics = {
   algorithm(familyId) {    
    return new Promise(async (resolve, reject) => {
      const ProductsModel = mongoose.model('Products')
      const PlatesModel = mongoose.model('Plates')

      try {
          const Products = await ProductsModel.find({familyId});
          const Plates = await PlatesModel.find();
          // console.log("Products: "+JSON.stringify(Products))
          // console.log("Plates: "+JSON.stringify(Plates))
          resolve(algorithm(Plates, Products))
      } catch (error) {
        console.log('[ERROR]: ', error)
        resolve({
          type: 'internal',
          subtype: "handoven-api.Plates",
          message: "Não foi possível executar o algorítmo, tente novamente mais tarde ou contate a equipe de suporte!"
        })
      }
    });
  }
}

const model = mongoose.model('Plates', Plates)

export const schema = model.schema
export default model
