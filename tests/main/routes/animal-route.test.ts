import app from '@/main/configs/app'

import { MongoDbAnimalModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'

import request from 'supertest'
import faker from 'faker'

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
    test('Should return 400 and missing param error if an animal attribute not send', async () => {
      const mockRequest = {
        age: faker.random.number(99),
        type: faker.random.word(),
        weight: faker.random.float(1000)
      }
      await request(app)
        .post('/api/animal')
        .send(mockRequest)
        .expect(400, {
          error: 'Missing param: name'
        })
    })

    test('Should return 200 and AnimalModel on success', async () => {
      const mockRequest = {
        name: faker.name.findName(),
        age: faker.random.number(99),
        type: faker.random.word(),
        weight: faker.random.float(1000)
      }
      await request(app)
        .post('/api/animal')
        .send(mockRequest)
        .expect(200)
    })
  })
})
