import { LoadAnimalById } from '@/domain/use-cases'

export interface LoadAnimalByIdRepo {
  load: (id: LoadAnimalByIdRepo.Params) => Promise<LoadAnimalByIdRepo.Result>
}

export namespace LoadAnimalByIdRepo {
  export type Params = LoadAnimalById.Params
  export type Result = LoadAnimalById.Result
}
