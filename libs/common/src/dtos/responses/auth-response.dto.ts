import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class LoginResponseDto {
  @Expose()
  @ApiProperty()
  accessToken: string
}
