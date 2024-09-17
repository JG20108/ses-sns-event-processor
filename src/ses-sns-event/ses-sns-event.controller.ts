import { Controller, Post, Body } from '@nestjs/common';
import { SesSnsEventDto, SesMessage } from '../dto/ses-sns-event.dto';
import { ProcessedEventDto } from '../dto/processed-event.dto';

@Controller('ses-sns-event')
export class SesSnsEventController {
  @Post()
  processEvent(@Body() event: SesSnsEventDto): ProcessedEventDto {
    const sesMessage: SesMessage = JSON.parse(event.Records[0].Sns.Message);
    const processedEvent = new ProcessedEventDto();

    processedEvent.spam = sesMessage.receipt.spamVerdict.status === 'PASS';
    processedEvent.virus = sesMessage.receipt.virusVerdict.status === 'PASS';
    processedEvent.dns =
      sesMessage.receipt.spfVerdict.status === 'PASS' &&
      sesMessage.receipt.dkimVerdict.status === 'PASS' &&
      sesMessage.receipt.dmarcVerdict.status === 'PASS';
    processedEvent.mes = new Date(sesMessage.mail.timestamp).toLocaleString('default', {
      month: 'long',
    });
    processedEvent.retrasado = sesMessage.receipt.processingTimeMillis > 1000;
    processedEvent.emisor = sesMessage.mail.source.split('@')[0];
    processedEvent.receptor = sesMessage.mail.destination.map((dest) => dest.split('@')[0]);

    return processedEvent;
  }
}
