import { Injectable } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'
import { Message } from '@aws-sdk/client-sqs'

import { AWS_CONSTANTS } from '@utils/constants'

@Injectable()
export class SqsHandler {
  @SqsMessageHandler(AWS_CONSTANTS.SQS_QUEUE_NAME, AWS_CONSTANTS.SQS_BATCH_POLLING)
  async handleMessage(message: Message) {
    const parsedBody = JSON.parse(message.Body) as { Message: string }
    const sqsMessage = JSON.parse(parsedBody.Message)
    console.log('SQS Message =>', sqsMessage)
  }

  @SqsConsumerEventHandler(AWS_CONSTANTS.SQS_QUEUE_NAME, 'error')
  async onError(error: Error) {
    console.error('Warning!', error.message)
  }
}
