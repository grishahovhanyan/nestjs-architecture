import { Module } from '@nestjs/common'
import { SqsModule } from '@ssut/nestjs-sqs'

import { SqsConfigService } from './sqs-config.service'
import { SqsHandler } from './sqs.handler'
import { SnsService } from './sns.service'

@Module({
  imports: [SqsModule.registerAsync({ useClass: SqsConfigService })],
  providers: [SqsHandler, SnsService],
  exports: [SnsService]
})
export class AWSModule {}
