import * as Joi from 'joi'

/*
####### NOTE #######
The `envValidationSchema` object defines the validation rules for environment variables using the `Joi` library. 
Each environment variable listed is required for the application to run properly. This ensures that all necessary 
configuration values are present and valid before the application starts.

Examples: If you plan to use the `AWSModule`, you should also include and validate the following environment variables:
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_REGION`: The AWS region your resources are hosted in.
- `SQS_URL`: The URL of the AWS SQS queue.
- `SNS_ARN`: The ARN of the AWS SNS topic.
*/
export const envValidationSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required()
})

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 20
