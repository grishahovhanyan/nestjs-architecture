import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

import { QueueNames } from '../queue.enum'
import { MailJobNames } from './enums'

@Processor(QueueNames.mail)
export class MailQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(MailQueueProcessor.name)

  async process(job: Job) {
    switch (job.name) {
      case MailJobNames.sendMail:
        return this.handleSendMail(job)
      default:
        this.logger.warn(`⚠️ Job "${job.name}" is not handled.`)
        break
    }
  }

  // TODO: implement a mail service
  private async handleSendMail(job: Job) {
    this.logger.log(`✅ Handling "${MailJobNames.sendMail}" job with ID: ${job.id}`)
    this.logger.debug(`Job Data: ${JSON.stringify(job.data)}`)

    try {
    } catch (error) {
      this.logger.error(`❌ Error handling "${MailJobNames.sendMail}" job: ${error.message}`, error.stack)
      throw error
    }
  }
}
