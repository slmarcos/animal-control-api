import { DbLoadAnimalById } from '@/data/use-cases'
import { LoadAnimalById } from '@/domain/use-cases'
import { MongoDbLoadAnimalByIdRepo } from '@/infra/db/repositories'

export const makeDbLoadAnimalByIdFactory = (): LoadAnimalById => {
  const loadAnimalByIdRepo = new MongoDbLoadAnimalByIdRepo()
  return new DbLoadAnimalById(loadAnimalByIdRepo)
}
