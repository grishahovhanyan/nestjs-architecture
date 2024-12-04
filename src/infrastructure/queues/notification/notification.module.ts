import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'

import { QueueNames } from '../queue.enum'
import { NotificationQueueService } from './notification.service'
import { NotificationProcessor } from './notification.processor'

@Module({
  imports: [BullModule.registerQueue({ name: QueueNames.notification })],
  providers: [NotificationQueueService, NotificationProcessor],
  exports: [NotificationQueueService]
})
export class NotificationQueueModule {}
