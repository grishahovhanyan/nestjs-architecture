import * as bcrypt from 'bcrypt'

export class HashService {
  static make(input: string): string {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(input, salt)
  }

  static compare(input: string, hash: string): boolean {
    return bcrypt.compareSync(input, hash)
  }
}
