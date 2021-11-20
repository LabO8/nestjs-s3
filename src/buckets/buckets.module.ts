import { Module, Provider } from '@nestjs/common';
import { BucketsService } from './buckers.service';

const sharedProviders: Provider[] = [BucketsService];
@Module({
  providers: [...sharedProviders],
  exports: [...sharedProviders],
})
export class BucketsModule {}
