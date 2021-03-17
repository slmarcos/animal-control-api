import { DbSaveAnimal } from '@/data/use-cases'
import { SaveAnimal } from '@/domain/use-cases'
import { MongoDbSaveAnimalRepo } from '@/infra/db/repositories'

export const makeDbSaveAnimal = (): SaveAnimal => {
  const saveAnimalRepo = new MongoDbSaveAnimalRepo()
  return new DbSaveAnimal(saveAnimalRepo)
}
