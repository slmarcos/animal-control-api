import app from '@/main/configs/app'

import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'

import request from 'supertest'
import faker from 'faker'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

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

  describe('[POST] /animal', () => {
    test('Should returns status code 400 and missing param error if an animal attribute not send', async () => {
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

    test('Should returns status code 200 and AnimalModel on success', async () => {
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

  describe('[PUT] /animal/:animalId', () => {
    test('Should returns status code 400 and missing param error if not send all animal attributes', async () => {
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

    test('Should returns noContent if animalId not exists', async () => {
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

    test('Should returns status code 200 and updated AnimalModel on success', async () => {
      const mockAnimal = {
        name: faker.name.firstName(),
        age: 12,
        type: faker.random.word(),
        weight: 100
      }
      const animal = await MongoDbAnimalModel.create(mockAnimal)
      const animalId: string = animal.id
      const mockRequest = {
        ...mockAnimal,
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
})
