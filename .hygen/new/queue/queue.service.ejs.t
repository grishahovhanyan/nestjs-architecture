---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/<%= h.queueServiceFileName(queueName) %>.ts"
unless_exists: true
---
<%
  QueueNameEnumKey = h.QueueNameEnumKey(queueName)
  QueueJobNamesEnumName = h.QueueJobNamesEnumName(queueName)

  QueueServiceName = h.QueueServiceName(queueName)

  queueParamName = h.queueParamName(queueName)

%>import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Queue } from 'bullmq'
import _ from 'lodash'

import { QueueNames } from '../queue.enum'
import { AbstractQueueService } from '../queue.service'
import { <%= QueueJobNamesEnumName %> } from './enums'

@Injectable()
export class <%= QueueServiceName %> extends AbstractQueueService implements OnApplicationBootstrap {
  protected readonly logger: Logger = new Logger(_.upperFirst(_.camelCase(QueueNames.<%= QueueNameEnumKey %>)))

  private _queue: Queue

  get queue(): Queue {
    return this._queue
  }

  constructor(@InjectQueue(QueueNames.<%= QueueNameEnumKey %>) private readonly <%= queueParamName %>: Queue) {
    super()
    this._queue = this.<%= queueParamName %>
  }

  public async onApplicationBootstrap(): Promise<void> {
    await this.checkConnection()
    await this.initEventListeners()
  }

  public async exampleJob(payload: Record<string, string>) {
    return this.addJob(<%= QueueJobNamesEnumName %>.exampleJob, payload)
  }
}
