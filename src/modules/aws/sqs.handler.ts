import { Injectable } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'
import { Message } from '@aws-sdk/client-sqs'

import { SQS_BATCH_POLLING, SQS_QUEUE_NAME } from '@app/common'

@Injectable()
export class SqsHandler {
  @SqsMessageHandler(SQS_QUEUE_NAME, SQS_BATCH_POLLING)
  async handleMessage(message: Message) {
    const parsedBody = JSON.parse(message.Body) as { Message: string }
    const sqsMessage = JSON.parse(parsedBody.Message)
    console.log('SQS Message =>', sqsMessage)
  }

  @SqsConsumerEventHandler(SQS_QUEUE_NAME, 'error')
  async onError(error: Error) {
    console.error('Warning!', error.message)
  }
}
