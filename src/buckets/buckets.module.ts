import { Module } from '@nestjs/common';
import { BucketsService } from './buckers.service';

@Module({
  exports: [BucketsService],
})
export class BucketsModule {}
