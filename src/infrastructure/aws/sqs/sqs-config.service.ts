import { Injectable } from '@nestjs/common'
import { SqsModuleOptionsFactory, SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types'

import {
  SQS_AUTHENTICATION_ERROR_TIMEOUT,
  SQS_POLLING_WAIT_TIME_MS,
  SQS_QUEUE_NAME,
  SQS_URL,
  SQS_VISIBILITY_TIMEOUT,
  SQS_WAIT_TIME_SECONDS
} from '@app/common'

@Injectable()
export class SqsConfigService implements SqsModuleOptionsFactory {
  createOptions(): SqsOptions {
    return {
      consumers: [
        {
          queueUrl: SQS_URL,
          name: SQS_QUEUE_NAME,
          waitTimeSeconds: SQS_WAIT_TIME_SECONDS,
          visibilityTimeout: SQS_VISIBILITY_TIMEOUT,
          pollingWaitTimeMs: SQS_POLLING_WAIT_TIME_MS,
          authenticationErrorTimeout: SQS_AUTHENTICATION_ERROR_TIMEOUT
        }
      ],
      producers: []
    }
  }
}
