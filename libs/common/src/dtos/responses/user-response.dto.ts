import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  firstName: string

  @Expose()
  @ApiProperty()
  lastName: string

  @Expose()
  @ApiProperty()
  fullName: string

  @Expose()
  @ApiProperty()
  email: string

  @Expose()
  @ApiProperty()
  birthDate: string

  @Expose()
  @ApiProperty()
  age: number

  @Expose()
  @ApiProperty()
  registeredAt: string
}
