import { Validator } from '@/presentation/protocols'

export class ValidatorSpy implements Validator {
  input: any
  error: Error | null = null

  validate (input: any): Error | null {
    this.input = input
    return this.error
  }
}
