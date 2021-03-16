import { MongoDbAnimalModel } from '@/infra/db/models'
import { SaveAnimalRepo } from '@/data/protocols'
import { SaveAnimal } from '@/domain/use-cases'

export class MongoDbSaveAnimalRepo implements SaveAnimalRepo {
  async save (data: SaveAnimal.Params): Promise<SaveAnimalRepo.Result> {
    const animal = await MongoDbAnimalModel.create(data)
    return {
      id: animal._id,
      name: animal.name,
      age: animal.age,
      weight: animal.weight,
      type: animal.type
    }
  }
}
