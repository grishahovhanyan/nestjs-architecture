import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import { PostgresConfigService } from './postgres-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      async dataSourceFactory(options) {
        const logger = new Logger('Database')

        if (!options) {
          throw new Error('❌ [Postgres database connection failed]: Invalid options passed')
        }

        try {
          const source = addTransactionalDataSource(new DataSource(options))
          await source.initialize()
          logger.log(`🎯 Database initialized successfully.`)

          return source
        } catch (error) {
          logger.error(`❌ [Database connection error]: ${error.message}`)
          throw error
        }
      }
    })
  ]
})
export class PostgresModule {}
