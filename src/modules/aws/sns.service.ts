import { SNS } from '@aws-sdk/client-sns'
import { Injectable } from '@nestjs/common'
import { AWS_CONSTANTS } from '@utils/constants'

@Injectable()
export class SnsService {
  private readonly client: SNS

  constructor() {
    this.client = new SNS({ region: AWS_CONSTANTS.AWS_REGION })
  }

  async publish(payload: any) {
    const params = {
      TopicArn: AWS_CONSTANTS.SNS_ARN,
      Message: JSON.stringify(payload)
    }
    const response = await this.client.publish(params)

    return {
      MessageId: response.MessageId
    }
  }
}
