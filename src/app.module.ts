import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesSnsEventController } from './ses-sns-event/ses-sns-event.controller';

@Module({
  imports: [],
  controllers: [AppController, SesSnsEventController],
  providers: [AppService],
})
export class AppModule {}
