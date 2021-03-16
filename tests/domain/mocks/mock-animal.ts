import { SaveAnimal } from '@/domain/use-cases'

import faker from 'faker'

export const mockSaveAnimalParams = (): SaveAnimal.Params => ({
  age: faker.random.number(99),
  name: faker.name.firstName(),
  type: faker.random.word(),
  weight: faker.random.float(1000)
})

export const mockAnimalModel = (): SaveAnimal.Result => ({
  id: faker.random.uuid(),
  age: faker.random.number(99),
  name: faker.name.firstName(),
  type: faker.random.word(),
  weight: faker.random.float(1000)
})
