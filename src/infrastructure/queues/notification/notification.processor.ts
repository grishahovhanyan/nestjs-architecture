import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

import { QueueNames } from '../queue.enum'
import { NotificationJobNames } from './enums'

@Processor(QueueNames.notification)
export class NotificationQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationQueueProcessor.name)

  async process(job: Job) {
    switch (job.name) {
      case NotificationJobNames.registrationSuccess:
        return this.handleRegistrationSuccess(job)
      default:
        this.logger.warn(`⚠️ Job "${job.name}" is not handled.`)
        break
    }
  }

  private async handleRegistrationSuccess(job: Job) {
    this.logger.log(`✅ Handling "${NotificationJobNames.registrationSuccess}" job with ID: ${job.id}`)
    this.logger.debug(`Job Data: ${JSON.stringify(job.data)}`)

    try {
      /*
      ####### NOTE #######
      Add your business logic here for handling "registrationSuccess"
      */
    } catch (error) {
      this.logger.error(
        `❌ Error handling "${NotificationJobNames.registrationSuccess}" job: ${error.message}`,
        error.stack
      )
      throw error
    }
  }
}
