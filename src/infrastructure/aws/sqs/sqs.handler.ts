import { Message } from '@aws-sdk/client-sqs'
import { Injectable, Logger } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'

import { SQS_BATCH_POLLING, SQS_QUEUE_NAME } from '@app/common'

@Injectable()
export class SqsHandler {
  private readonly logger = new Logger(SqsHandler.name)

  @SqsMessageHandler(SQS_QUEUE_NAME, SQS_BATCH_POLLING)
  async handleMessage(message: Message) {
    try {
      const parsedBody = JSON.parse(message.Body) as { Message: string }
      const sqsMessage = JSON.parse(parsedBody.Message)

      this.logger.log('SQS Message =>', sqsMessage)
    } catch (error) {
      this.logger.error('Failed to process message', error.stack)
    }
  }

  @SqsConsumerEventHandler(SQS_QUEUE_NAME, 'error')
  async onError(error: Error) {
    this.logger.warn(error.message)
  }
}
