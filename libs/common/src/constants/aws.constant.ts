import { envService } from '../utils'

const sqsWaitTimeSecondsValue = envService.getEnvNumber('SQS_WAIT_TIME_SECONDS', 20)
const sqsVisibilityTimeoutValue = envService.getEnvNumber('SQS_VISIBILITY_TIMEOUT', 30)

export const AWS_REGION = envService.getEnvString('AWS_REGION', 'us-east-1')

export const SQS_URL = envService.getEnvString('SQS_URL')
export const SQS_QUEUE_NAME = SQS_URL.split('/').pop()
export const SQS_WAIT_TIME_SECONDS =
  sqsWaitTimeSecondsValue >= 0 && sqsWaitTimeSecondsValue <= 20 ? sqsWaitTimeSecondsValue : 20
export const SQS_VISIBILITY_TIMEOUT =
  sqsVisibilityTimeoutValue >= 0 && sqsVisibilityTimeoutValue <= 43200 ? sqsVisibilityTimeoutValue : 30
export const SQS_POLLING_WAIT_TIME_MS = envService.getEnvNumber('SQS_POLLING_WAIT_TIME_MS', 0)
export const SQS_AUTHENTICATION_ERROR_TIMEOUT = envService.getEnvNumber('SQS_AUTHENTICATION_ERROR_TIMEOUT', 3600)
export const SQS_BATCH_POLLING = envService.getEnvBoolean('SQS_BATCH_POLLING', false)

export const SNS_ARN = envService.getEnvString('SNS_ARN')
