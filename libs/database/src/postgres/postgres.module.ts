import { addTransactionalDataSource } from 'typeorm-transactional'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { PostgresConfigService } from './postgres-config.service'
import { POSTGRES_ENTITIES } from './entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('[Postgres database connection failed]: Invalid options passed')
        }

        return addTransactionalDataSource(new DataSource(options))
      }
    }),
    TypeOrmModule.forFeature([...POSTGRES_ENTITIES])
  ],
  exports: [TypeOrmModule.forFeature([...POSTGRES_ENTITIES])]
})
export class PostgresModule {}
