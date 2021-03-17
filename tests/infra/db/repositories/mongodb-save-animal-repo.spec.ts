import { MongoDbSaveAnimalRepo } from '@/infra/db/repositories'
import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'

const MONGO_URI = process.env.MONGO_URL as string

type SutTypes = {
  sut: MongoDbSaveAnimalRepo
}

const makeSut = (): SutTypes => {
  const sut = new MongoDbSaveAnimalRepo()
  return {
    sut
  }
}

describe('MongoDbSaveAnimalRepo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoDbAnimalModel.deleteMany({})
  })

  test('Should return AnimalModel on success', async () => {
    const { sut } = makeSut()
    const animalParams = mockSaveAnimalParams()
    const animal = await sut.save(animalParams)
    expect(animal).toBeTruthy()
    expect(animal.name).toBe(animalParams.name)
  })

  test('Should return updated AnimalModel if animal id is provided and exists', async () => {
    const { sut } = makeSut()
    const animalParams = mockSaveAnimalParams()
    const animal = await sut.save(animalParams)
    const result = await sut.save({
      id: animal.id,
      ...animalParams,
      name: 'other_valid_name'
    })
    expect(result.id).toBe(animal.id)
    expect(result.name).toBe('other_valid_name')
    expect(result.type).toBe(animal.type)
  })
})
