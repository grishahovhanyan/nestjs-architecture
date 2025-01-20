---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/<%= h.queueModuleFileName(queueName) %>.ts"
unless_exists: true
---
<%
  QueueNameEnumKey = h.QueueNameEnumKey(queueName)

  QueueModuleName = h.QueueModuleName(queueName)  
  QueueProcessorName = h.QueueProcessorName(queueName)
  QueueServiceName = h.QueueServiceName(queueName)

  queueProcessorFileName = h.queueProcessorFileName(queueName)
  queueServiceFileName = h.queueServiceFileName(queueName)

%>import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'

import { QueueNames } from '../queue.enum'
import { <%= QueueProcessorName %> } from './<%= queueProcessorFileName %>'
import { <%= QueueServiceName %> } from './<%= queueServiceFileName %>'

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueNames.<%= QueueNameEnumKey %> }),
    BullBoardModule.forFeature({ name: QueueNames.<%= QueueNameEnumKey %>, adapter: BullMQAdapter })
  ],
  providers: [<%= QueueProcessorName %>, <%= QueueServiceName %>],
  exports: [<%= QueueServiceName %>]
})
export class <%= QueueModuleName %> {}
