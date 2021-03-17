import { LoadAnimalById } from '@/domain/use-cases'
import { LoadAnimalByIdRepo } from '@/data/protocols'

export class DbLoadAnimalById implements LoadAnimalById {
  constructor (
    private readonly loadAnimalByIdRepo: LoadAnimalByIdRepo
  ) { }

  async load (id: LoadAnimalById.Params): Promise<LoadAnimalById.Result> {
    return this.loadAnimalByIdRepo.load(id)
  }
}
