import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
// move this to auth module and also others
export class LoginResponseDto {
  @Expose()
  @ApiProperty()
  accessToken: string
}
