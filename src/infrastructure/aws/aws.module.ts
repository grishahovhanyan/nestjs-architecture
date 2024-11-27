import { Module } from '@nestjs/common'
import { SnsModule } from './sns/sns.module'
import { SqsModule } from './sqs/sqs.module'

@Module({
  imports: [SnsModule, SqsModule],
  exports: [SnsModule]
})
export class AWSModule {}
