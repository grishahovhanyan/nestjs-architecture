import { Injectable, Logger } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'
import { Message } from '@aws-sdk/client-sqs'

import { SQS_QUEUE_NAME, SQS_BATCH_POLLING } from '@app/common'

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
