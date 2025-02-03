import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Queue } from 'bullmq'
import _ from 'lodash'

import { QueueNames } from '../queue.enum'
import { AbstractQueueService } from '../queue.service'
import { MailJobNames, MailTemplateNames } from './enums'

@Injectable()
export class MailQueueService extends AbstractQueueService implements OnApplicationBootstrap {
  protected readonly logger: Logger = new Logger(_.upperFirst(_.camelCase(QueueNames.mail)))

  private _queue: Queue

  get queue(): Queue {
    return this._queue
  }

  constructor(@InjectQueue(QueueNames.mail) private readonly mailQueue: Queue) {
    super()
    this._queue = this.mailQueue
  }

  public async onApplicationBootstrap(): Promise<void> {
    await this.checkConnection()
    await this.initEventListeners()
  }

  public async sendResetPasswordMail(payload: Record<string, string>) {
    return this.addJob(MailJobNames.sendMail, {
      template: MailTemplateNames.resetPassword,
      ...payload
    })
  }
}
