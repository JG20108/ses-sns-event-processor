import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesSnsEventController } from './ses-sns-event/ses-sns-event.controller';
import { SesSnsEventService } from './ses-sns-event/ses-sns-event.service';

@Module({
  imports: [],
  controllers: [AppController, SesSnsEventController],
  providers: [AppService, SesSnsEventService],
})
export class AppModule {}
