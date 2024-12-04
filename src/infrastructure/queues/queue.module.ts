import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'

import { REDIS_CONFIG } from '@app/database'
import { NotificationQueueModule } from './notification/notification.module'

/*
####### NOTE #######
The `queueModules` array includes all queue-related modules in the application, such as `NotificationQueueModule`. 
These modules are included in both the `imports` and `exports` arrays of `QueueModule` 
to ensure their services/providers (e.g., `NotificationQueueService` from `NotificationQueueModule`) 
are globally available to other modules in the application.

Add additional queue modules here as your application grows.
*/
const queueModules = [NotificationQueueModule]

@Module({
  imports: [
    BullModule.forRoot({
      connection: { url: REDIS_CONFIG.url }
    }),
    ...queueModules
  ],
  exports: [...queueModules]
})
export class QueueModule {}
