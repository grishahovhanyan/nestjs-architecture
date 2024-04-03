import { Injectable } from '@nestjs/common'
import { SqsModuleOptionsFactory, SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types'
import { AWS_CONSTANTS } from '@utils/constants'

@Injectable()
export class SqsConfigService implements SqsModuleOptionsFactory {
  createOptions(): SqsOptions {
    return {
      consumers: [
        {
          queueUrl: AWS_CONSTANTS.SQS_URL,
          name: AWS_CONSTANTS.SQS_QUEUE_NAME,
          waitTimeSeconds: AWS_CONSTANTS.SQS_WAIT_TIME_SECONDS,
          visibilityTimeout: AWS_CONSTANTS.SQS_VISIBILITY_TIMEOUT,
          pollingWaitTimeMs: AWS_CONSTANTS.SQS_POLLING_WAIT_TIME_MS,
          authenticationErrorTimeout: AWS_CONSTANTS.SQS_AUTHENTICATION_ERROR_TIMEOUT
        }
      ],
      producers: []
    }
  }
}
