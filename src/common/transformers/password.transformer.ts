import { ValueTransformer } from 'typeorm'
import { HashService } from '../../utils/hash.service'

export class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return HashService.make(value)
  }

  from(value: string) {
    return value
  }
}
