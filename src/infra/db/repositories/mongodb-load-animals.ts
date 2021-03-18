import { MongoDbAnimalModel } from '@/infra/db/models'
import { LoadAnimalsRepo } from '@/data/protocols'

export class MongoDbLoadAnimalsRepo implements LoadAnimalsRepo {
  async load (): Promise<LoadAnimalsRepo.Result> {
    const animals = await MongoDbAnimalModel.find()
    return animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      age: animal.age,
      weight: animal.weight,
      type: animal.type
    }))
  }
}
