import { MongoDbAnimalModel } from '@/infra/db/models'
import { SaveAnimalRepo } from '@/data/protocols'

export class MongoDbSaveAnimalRepo implements SaveAnimalRepo {
  async save (data: SaveAnimalRepo.Params): Promise<SaveAnimalRepo.Result> {
    let animal = await MongoDbAnimalModel.findById(data.id)
    if (!animal) {
      animal = await MongoDbAnimalModel.create(data)
    } else {
      animal.name = data.name
      animal.age = data.age
      animal.weight = data.weight
      animal.type = data.type
      await animal.save()
    }
    return {
      id: animal.id,
      name: animal.name,
      age: animal.age,
      weight: animal.weight,
      type: animal.type
    }
  }
}
