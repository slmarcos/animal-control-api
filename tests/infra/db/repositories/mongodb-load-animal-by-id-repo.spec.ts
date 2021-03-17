import { MongoDbLoadAnimalByIdRepo, MongoDbSaveAnimalRepo } from '@/infra/db/repositories'
import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'

import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URL as string

type SutTypes = {
  sut: MongoDbLoadAnimalByIdRepo
  mongoDbSaveAnimalRepo: MongoDbSaveAnimalRepo
}

const makeSut = (): SutTypes => {
  const sut = new MongoDbLoadAnimalByIdRepo()
  const mongoDbSaveAnimalRepo = new MongoDbSaveAnimalRepo()
  return {
    sut,
    mongoDbSaveAnimalRepo
  }
}

describe('MongoDbLoadAnimalByIdRepo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoDbAnimalModel.deleteMany({})
  })

  test('Should return null if id not exists', async () => {
    const { sut } = makeSut()
    const animalId = mongoose.Types.ObjectId().toHexString()
    const animal = await sut.load(animalId)
    expect(animal).toBeNull()
  })

  test('Should return AnimalModel if id exists', async () => {
    const { sut, mongoDbSaveAnimalRepo } = makeSut()
    const animalParams = mockSaveAnimalParams()
    const animal = await mongoDbSaveAnimalRepo.save(animalParams)
    const result = await sut.load(animal.id)
    expect(result).toBeTruthy()
    expect(result?.id).toBe(animal.id)
  })
})
