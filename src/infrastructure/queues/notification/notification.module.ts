import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import { QueueNames } from '../queue.enum'
import { NotificationQueueProcessor } from './notification.processor'
import { NotificationQueueService } from './notification.service'

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueNames.notification }),
    BullBoardModule.forFeature({ name: QueueNames.notification, adapter: BullMQAdapter })
  ],
  providers: [NotificationQueueProcessor, NotificationQueueService],
  exports: [NotificationQueueService]
})
export class NotificationQueueModule {}
