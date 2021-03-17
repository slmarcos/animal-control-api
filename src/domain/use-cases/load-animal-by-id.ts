import { AnimalModel } from '@/domain/models'

export interface LoadAnimalById {
  load: (id: LoadAnimalById.Params) => Promise<LoadAnimalById.Result>
}

export namespace LoadAnimalById {
  export type Params = string
  export type Result = AnimalModel | null
}
