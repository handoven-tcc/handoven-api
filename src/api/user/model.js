import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  cell: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  familyId: {
    type: Schema.Types.ObjectId,
    required: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

userSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      cell: this.cell,
      email: this.email,
      password: this.password,
      familyId: this.familyId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return view
  },
  logView (body) {
    if (body.email && body.password) {
      if (body.email === this.email && body.password === this.password) {
        const logView = {
          // view informations on login
          id: this.id,
          name: this.name,
          birthDate: this.birthDate,
          email: this.email,
          cell: this.cell,
          familyId: this.familyId
        }

        return logView
      }
    }
  }
}

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
