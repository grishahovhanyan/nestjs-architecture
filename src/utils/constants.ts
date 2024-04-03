const SQS_WAIT_TIME_SECONDS = +process.env.SQS_WAIT_TIME_SECONDS
const SQS_VISIBILITY_TIMEOUT = +process.env.SQS_VISIBILITY_TIMEOUT

export const AWS_CONSTANTS = {
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  SQS_URL: process.env.SQS_URL || '',
  SQS_QUEUE_NAME: (process.env.SQS_URL || '').split('/').pop(),
  SQS_WAIT_TIME_SECONDS: SQS_WAIT_TIME_SECONDS >= 0 && SQS_WAIT_TIME_SECONDS <= 20 ? SQS_WAIT_TIME_SECONDS : 20,
  SQS_VISIBILITY_TIMEOUT: SQS_VISIBILITY_TIMEOUT >= 0 && SQS_VISIBILITY_TIMEOUT <= 43200 ? SQS_VISIBILITY_TIMEOUT : 30,
  SQS_POLLING_WAIT_TIME_MS: +process.env.SQS_POLLING_WAIT_TIME_MS || 0,
  SQS_AUTHENTICATION_ERROR_TIMEOUT: +process.env.SQS_AUTHENTICATION_ERROR_TIMEOUT || 3600,
  SQS_BATCH_POLLING: process.env.SQS_BATCH_POLLING === 'true',
  SNS_ARN: process.env.SNS_ARN || ''
}

export const JWT_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || 'strong_secret_key',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1d'
}

export const SORT_DIRECTIONS = {
  ascending: 'ASC',
  descending: 'DESC'
}

export const PRODUCTS_SORT_FIELDS = ['id', 'createdAt', 'price']
