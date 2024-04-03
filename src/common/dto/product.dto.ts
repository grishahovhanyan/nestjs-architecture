import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty({ example: 'Iphone 15' })
  name: string

  @ApiProperty({ example: 'phone' })
  category: string

  @ApiProperty({ example: 1599 })
  price: number

  @ApiProperty({ example: 'Iphone 15' })
  description: string
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Iphone 15' })
  name: string

  @ApiPropertyOptional({ example: 'phone' })
  category: string

  @ApiPropertyOptional({ example: 1599 })
  price: number

  @ApiPropertyOptional({ example: 'Iphone 15' })
  description: string
}
