import { ValueTransformer } from 'typeorm'
import * as bcrypt from 'bcryptjs'

export class HashService {
  static make(input: string): string {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(input, salt)
  }

  static compare(input: string, hash: string): boolean {
    return bcrypt.compareSync(input, hash)
  }
}

export class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return HashService.make(value)
  }

  from(value: string) {
    return value
  }
}
