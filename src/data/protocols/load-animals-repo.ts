import { LoadAnimals } from '@/domain/use-cases'

export interface LoadAnimalsRepo {
  load: () => Promise<LoadAnimalsRepo.Result>
}

export namespace LoadAnimalsRepo {
  export type Result = LoadAnimals.Result
}
