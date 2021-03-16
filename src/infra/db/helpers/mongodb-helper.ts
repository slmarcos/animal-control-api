import mongoose, { Mongoose } from 'mongoose'

export const MongoHelper = {
  uri: null as string | null,
  client: null as Mongoose | null,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client?.disconnect()
    this.client = null
  }
}
