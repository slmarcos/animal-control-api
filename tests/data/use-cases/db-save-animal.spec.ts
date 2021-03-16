import { DbSaveAnimal } from '@/data/use-cases'
import { SaveAnimal } from '@/domain/use-cases'
import { SaveAnimalRepoSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/helpers'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveAnimal
  saveAnimalRepoSpy: SaveAnimalRepoSpy
}

const makeSut = (): SutTypes => {
  const saveAnimalRepoSpy = new SaveAnimalRepoSpy()
  const sut = new DbSaveAnimal(saveAnimalRepoSpy)
  return {
    sut,
    saveAnimalRepoSpy
  }
}

let saveAnimalParams: SaveAnimal.Params

describe('DbSaveAnimal use case', () => {
  beforeEach(() => {
    saveAnimalParams = mockSaveAnimalParams()
  })

  test('Should calls SaveAnimalRepo with correct params', async () => {
    const { sut, saveAnimalRepoSpy } = makeSut()
    await sut.save(saveAnimalParams)
    expect(saveAnimalRepoSpy.params).toEqual(saveAnimalParams)
  })

  test('Should throws if SaveAnimalRepo throws', async () => {
    const { sut, saveAnimalRepoSpy } = makeSut()
    jest.spyOn(saveAnimalRepoSpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(saveAnimalParams)
    await expect(promise).rejects.toThrow()
  })
})
