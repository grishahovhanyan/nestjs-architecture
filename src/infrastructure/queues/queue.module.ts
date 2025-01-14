import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ExpressAdapter } from '@bull-board/express'
import { BullBoardModule } from '@bull-board/nestjs'
import basicAuth from 'express-basic-auth'

import { envService } from '@app/common'
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
    BullBoardModule.forRoot({
      route: '/admin/bull-board',
      adapter: ExpressAdapter,
      middleware: [
        basicAuth({
          challenge: true,
          users: {
            [envService.getEnvString('BULL_ADMIN_USERNAME')]: envService.getEnvString('BULL_ADMIN_PASSWORD')
          }
        })
      ]
    }),
    ...queueModules
  ],
  exports: [...queueModules]
})
export class QueueModule {}
