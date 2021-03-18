import { MongoDbLoadAnimalsRepo, MongoDbSaveAnimalRepo } from '@/infra/db/repositories'
import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'

const MONGO_URI = process.env.MONGO_URL as string

type SutTypes = {
  sut: MongoDbLoadAnimalsRepo
  mongoDbSaveAnimalRepo: MongoDbSaveAnimalRepo
}

const makeSut = (): SutTypes => {
  const sut = new MongoDbLoadAnimalsRepo()
  const mongoDbSaveAnimalRepo = new MongoDbSaveAnimalRepo()
  return {
    sut,
    mongoDbSaveAnimalRepo
  }
}

describe('MongoDbLoadAnimalsRepo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoDbAnimalModel.deleteMany({})
  })

  test('Should return empty array if no animals registered', async () => {
    const { sut } = makeSut()
    const animals = await sut.load()
    expect(animals.length).toBe(0)
  })

  test('Should return an array of AnimalModel', async () => {
    const { sut, mongoDbSaveAnimalRepo } = makeSut()
    const firstAnimalParams = mockSaveAnimalParams()
    const secondAnimalParams = mockSaveAnimalParams()
    const firstAnimal = await mongoDbSaveAnimalRepo.save(firstAnimalParams)
    const secondAnimal = await mongoDbSaveAnimalRepo.save(secondAnimalParams)
    const animals = await sut.load()
    expect(animals.length).toBe(2)
    expect(animals[0].id).toBe(firstAnimal.id)
    expect(animals[1].id).toBe(secondAnimal.id)
  })
})
