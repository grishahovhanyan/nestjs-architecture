import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import { QueueNames } from '../queue.enum'
import { MailQueueProcessor } from './mail.processor'
import { MailQueueService } from './mail.service'

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueNames.mail }),
    BullBoardModule.forFeature({ name: QueueNames.mail, adapter: BullMQAdapter })
  ],
  providers: [MailQueueProcessor, MailQueueService],
  exports: [MailQueueService]
})
export class MailQueueModule {}
