import { IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsOptional()
  page?: number

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsOptional()
  perPage?: number
}
