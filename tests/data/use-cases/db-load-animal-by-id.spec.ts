import { DbLoadAnimalById } from '@/data/use-cases'
import { LoadAnimalById } from '@/domain/use-cases'
import { LoadAnimalByIdRepoSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/helpers'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAnimalById
  loadAnimalByIdRepoSpy: LoadAnimalByIdRepoSpy
}

const makeSut = (): SutTypes => {
  const loadAnimalByIdRepoSpy = new LoadAnimalByIdRepoSpy()
  const sut = new DbLoadAnimalById(loadAnimalByIdRepoSpy)
  return {
    sut,
    loadAnimalByIdRepoSpy
  }
}

let loadAnimalByIdParams: LoadAnimalById.Params

describe('DbLoadAnimalById use case', () => {
  beforeEach(() => {
    loadAnimalByIdParams = faker.random.uuid()
  })

  test('Should calls LoadAnimalByIdRepo with correct id', async () => {
    const { sut, loadAnimalByIdRepoSpy } = makeSut()
    await sut.load(loadAnimalByIdParams)
    expect(loadAnimalByIdRepoSpy.params).toEqual(loadAnimalByIdParams)
  })

  test('Should throws if LoadAnimalByIdRepo throws', async () => {
    const { sut, loadAnimalByIdRepoSpy } = makeSut()
    jest.spyOn(loadAnimalByIdRepoSpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(loadAnimalByIdParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return AnimalModel on success', async () => {
    const { sut, loadAnimalByIdRepoSpy } = makeSut()
    const animal = await sut.load(loadAnimalByIdParams)
    expect(animal).toEqual(loadAnimalByIdRepoSpy.result)
  })
})
