import { MongoDbAnimalModel } from '@/infra/db/models'
import { SaveAnimalRepo } from '@/data/protocols'
import { SaveAnimal } from '@/domain/use-cases'

export class MongoDbSaveAnimalRepo implements SaveAnimalRepo {
  async save (data: SaveAnimal.Params): Promise<SaveAnimalRepo.Result> {
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
