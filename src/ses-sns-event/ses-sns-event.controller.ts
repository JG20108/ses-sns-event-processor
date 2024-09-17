import { Controller, Post, Body } from '@nestjs/common';
import { SesSnsEventDto } from '../dto/ses-sns-event.dto';
import { ProcessedEventDto } from '../dto/processed-event.dto';
import { SesSnsEventService } from './ses-sns-event.service';

@Controller('ses-sns-event')
export class SesSnsEventController {
  // Dependency Injection: We inject the service to follow the Dependency Inversion Principle
  constructor(private readonly sesSnsEventService: SesSnsEventService) {}

  @Post()
  // Single Responsibility: The controller only handles HTTP-related logic
  processEvent(@Body() event: SesSnsEventDto): ProcessedEventDto {
    return this.sesSnsEventService.processEvent(event);
  }
}
