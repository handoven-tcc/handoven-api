import mongoose, { Schema } from 'mongoose'

const Plates = new Schema({
  nome: {
    type: String,
    required: true
  },
  secao: {
    type: Array,
    required: true
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
      // simple view
      id: this._id,
      nome: this.nome,
      secao: [this.secao]
    }
    return view
  },
  viewOne (plate) {
    const viewOne = {
      id: plate.id,
      nome: plate.nome,
      ingredients: plate.secao[0],
      howDo: plate.secao[1],
      moreInformations: plate.secao[2]
    }
    return viewOne
  }
}

const model = mongoose.model('Plates', Plates)

export const schema = model.schema
export default model
