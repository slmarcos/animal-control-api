import app from '@/main/configs/app'

import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'

import request from 'supertest'
import faker from 'faker'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

const mockAnimal = () => ({
  name: faker.name.firstName(),
  age: 12,
  type: faker.random.word(),
  weight: 100
})

describe('Animal Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoDbAnimalModel.deleteMany({})
  })

  describe('[POST] /api/animal', () => {
    test('[POST] Should returns status code 400 and missing param error if an animal attribute not send', async () => {
      const mockRequest = {
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      await request(app)
        .post('/api/animal')
        .send(mockRequest)
        .expect(400, {
          error: 'Missing param: name'
        })
    })

    test('[POST] Should returns status code 200 and AnimalModel on success', async () => {
      const mockRequest = {
        name: faker.name.findName(),
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      await request(app)
        .post('/api/animal')
        .send(mockRequest)
        .expect(200)
    })
  })

  describe('[PUT] /api/animal/:animalId', () => {
    test('[PUT] Should returns status code 400 and missing param error if not send all animal attributes', async () => {
      const animalId = mongoose.Types.ObjectId().toHexString()
      const mockRequest = {
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      await request(app)
        .put(`/api/animal/${animalId}`)
        .send(mockRequest)
        .expect(400, {
          error: 'Missing param: name'
        })
    })

    test('[PUT] Should returns status code 400 and invalid param error if invalid animalId is provided', async () => {
      const animalId = 'any_invalid_id'
      const mockRequest = {
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      await request(app)
        .put(`/api/animal/${animalId}`)
        .send(mockRequest)
        .expect(400, {
          error: 'Invalid param: animalId'
        })
    })

    test('[PUT] Should returns noContent if animalId not exists', async () => {
      const animalId = mongoose.Types.ObjectId().toHexString()
      const mockRequest = {
        name: faker.name.firstName(),
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      await request(app)
        .put(`/api/animal/${animalId}`)
        .send(mockRequest)
        .expect(204)
    })

    test('[PUT] Should returns status code 200 and updated AnimalModel on success', async () => {
      const animalParams = mockAnimal()
      const animal = await MongoDbAnimalModel.create(animalParams)
      const animalId: string = animal.id
      const mockRequest = {
        ...animalParams,
        name: 'other_valid_name'
      }
      await request(app)
        .put(`/api/animal/${animalId}`)
        .send(mockRequest)
        .expect(200, {
          id: animalId,
          name: mockRequest.name,
          age: mockRequest.age,
          type: mockRequest.type,
          weight: mockRequest.weight
        })
    })
  })

  describe('[GET] /api/animal/:animalId', () => {
    test('[GET] Should returns status code 400 and invalid param error if an invalid animalId is provided', async () => {
      const animalId = faker.random.uuid()
      await request(app)
        .get(`/api/animal/${animalId}`)
        .expect(400, {
          error: 'Invalid param: animalId'
        })
    })

    test('[GET] Should returns noContent if animalId not existss', async () => {
      const animalId = mongoose.Types.ObjectId().toHexString()
      await request(app)
        .get(`/api/animal/${animalId}`)
        .expect(204)
    })

    test('[GET] Should returns status code 200 and AnimalModel on success', async () => {
      const animalParams = mockAnimal()
      const animal = await MongoDbAnimalModel.create(animalParams)
      const animalId: string = animal.id
      await request(app)
        .get(`/api/animal/${animalId}`)
        .expect(200, {
          id: animalId,
          name: animalParams.name,
          age: animalParams.age,
          type: animalParams.type,
          weight: animalParams.weight
        })
    })
  })

  describe('[GET] /api/animals', () => {
    test('[GET] Should returns status code 200 and empty array of AnimalModel on success', async () => {
      await request(app)
        .get('/api/animals')
        .expect(200, [])
    })

    test('[GET] Should returns status code 200 and array of AnimalModel on success', async () => {
      const fistAnimalParams = mockAnimal()
      const secondAnimalParams = mockAnimal()
      const firstAnimal = await MongoDbAnimalModel.create(fistAnimalParams)
      const secondAnimal = await MongoDbAnimalModel.create(secondAnimalParams)
      await request(app)
        .get('/api/animals')
        .expect(200, [
          {
            id: firstAnimal.id,
            ...fistAnimalParams
          },
          {
            id: secondAnimal.id,
            ...secondAnimalParams
          }
        ])
    })
  })
})
