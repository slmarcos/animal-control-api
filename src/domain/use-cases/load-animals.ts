import { AnimalModel } from '@/domain/models'

export interface LoadAnimals {
  load: () => Promise<LoadAnimals.Result>
}

export namespace LoadAnimals {
  export type Result = AnimalModel[]
}
