import { MongoDbAnimalModel } from '@/infra/db/models'
import { LoadAnimalByIdRepo } from '@/data/protocols'

export class MongoDbLoadAnimalByIdRepo implements LoadAnimalByIdRepo {
  async load (id: LoadAnimalByIdRepo.Params): Promise<LoadAnimalByIdRepo.Result> {
    const animal = await MongoDbAnimalModel.findById(id)
    if (!animal) {
      return null
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
