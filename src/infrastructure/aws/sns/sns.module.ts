import { Module } from '@nestjs/common'
import { SnsService } from './sns.service'

@Module({
  providers: [SnsService],
  exports: [SnsService]
})
export class SnsModule {}
