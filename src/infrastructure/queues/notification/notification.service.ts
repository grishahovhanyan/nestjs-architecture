import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import _ from 'lodash'

import { QueueNames } from '../queue.enum'
import { NotificationJobNames } from './enums'
import { AbstractQueueService } from '../queue.service'

@Injectable()
export class NotificationQueueService extends AbstractQueueService implements OnApplicationBootstrap {
  protected readonly logger: Logger = new Logger(_.upperFirst(_.camelCase(QueueNames.notification)))

  private _queue: Queue

  get queue(): Queue {
    return this._queue
  }

  constructor(@InjectQueue(QueueNames.notification) private readonly notificationQueue: Queue) {
    super()
    this._queue = this.notificationQueue
  }

  public async onApplicationBootstrap(): Promise<void> {
    await this.checkConnection()
    await this.initEventListeners()
  }

  public async registrationSuccess(payload: { fullName: string; email: string }) {
    return this.addJob(NotificationJobNames.registrationSuccess, payload)
  }
}
