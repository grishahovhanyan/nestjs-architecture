import { Module } from '@nestjs/common'
import { SqsModule as NestSqsModule } from '@ssut/nestjs-sqs'

import { SqsConfigService } from './sqs-config.service'
import { SqsHandler } from './sqs.handler'

@Module({
  imports: [NestSqsModule.registerAsync({ useClass: SqsConfigService })],
  providers: [SqsHandler]
})
export class SqsModule {}
