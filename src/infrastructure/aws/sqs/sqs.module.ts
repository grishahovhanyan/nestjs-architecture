import { Module } from '@nestjs/common'
import { SqsModule as NestSqsModule } from '@ssut/nestjs-sqs'

import { SqsHandler } from './sqs.handler'
import { SqsConfigService } from './sqs-config.service'

@Module({
  imports: [NestSqsModule.registerAsync({ useClass: SqsConfigService })],
  providers: [SqsHandler]
})
export class SqsModule {}
