import { SNS } from '@aws-sdk/client-sns'
import { Injectable } from '@nestjs/common'

import { AWS_REGION, SNS_ARN } from '@app/common'

@Injectable()
export class SnsService {
  private readonly client: SNS

  constructor() {
    this.client = new SNS({ region: AWS_REGION })
  }

  async publish(payload: Record<string, any>) {
    const params = {
      TopicArn: SNS_ARN,
      Message: JSON.stringify(payload)
    }
    const response = await this.client.publish(params)

    return {
      MessageId: response.MessageId
    }
  }
}
