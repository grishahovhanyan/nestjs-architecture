import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { POSTGRES_ENTITIES } from '@database/entities/index'
import { TypeOrmConfigService } from './typeorm-config.service'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => await new DataSource(options).initialize()
    }),
    TypeOrmModule.forFeature([...POSTGRES_ENTITIES])
  ],
  exports: [TypeOrmModule.forFeature([...POSTGRES_ENTITIES])]
})
export class PostgresModule {}
