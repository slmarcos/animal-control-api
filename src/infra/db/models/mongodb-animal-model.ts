import { Document, Model, model, Schema } from 'mongoose'

interface Animal {
  name: string
  age: number
  weight: number
  type: string
}

interface AnimalMongoDbDocument extends Document, Animal { }
interface AnimalMongoDbModel extends Model<AnimalMongoDbDocument> { }

const AnimalMongoDbSchema = new Schema<AnimalMongoDbDocument, AnimalMongoDbModel>({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

export default model<AnimalMongoDbDocument, AnimalMongoDbModel>('Animal', AnimalMongoDbSchema)
