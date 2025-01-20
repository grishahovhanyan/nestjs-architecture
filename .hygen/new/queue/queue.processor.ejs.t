---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/<%= h.queueProcessorFileName(queueName) %>.ts"
unless_exists: true
---
<%
  QueueNameEnumKey = h.QueueNameEnumKey(queueName)
  QueueJobNamesEnumName = h.QueueJobNamesEnumName(queueName)

  QueueProcessorName = h.QueueProcessorName(queueName)

%>import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

import { QueueNames } from '../queue.enum'
import { <%= QueueJobNamesEnumName %> } from './enums'

@Processor(QueueNames.<%= QueueNameEnumKey %>)
export class <%= QueueProcessorName %> extends WorkerHost {
  private readonly logger = new Logger(<%= QueueProcessorName %>.name)

  async process(job: Job) {
    switch (job.name) {
      case <%= QueueJobNamesEnumName %>.exampleJob:
        return this.handleExampleJob(job)
      default:
        this.logger.warn(`⚠️ Job "${job.name}" is not handled.`)
        break
    }
  }

  private async handleExampleJob(job: Job) {
    this.logger.log(`✅ Handling "${<%= QueueJobNamesEnumName %>.exampleJob}" job with ID: ${job.id}`)
    this.logger.debug(`Job Data: ${JSON.stringify(job.data)}`)

    try {
    } catch (error) {
      this.logger.error(`❌ Error handling "${<%= QueueJobNamesEnumName %>.exampleJob}" job: ${error.message}`, error.stack)
      throw error
    }
  }
}
