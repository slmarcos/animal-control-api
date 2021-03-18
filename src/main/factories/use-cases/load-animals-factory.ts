import { DbLoadAnimals } from '@/data/use-cases'
import { LoadAnimals } from '@/domain/use-cases'
import { MongoDbLoadAnimalsRepo } from '@/infra/db/repositories'

export const makeDbLoadAnimalsFactory = (): LoadAnimals => {
  const loadAnimalsRepo = new MongoDbLoadAnimalsRepo()
  return new DbLoadAnimals(loadAnimalsRepo)
}
