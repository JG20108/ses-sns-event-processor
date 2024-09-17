import { Injectable } from '@nestjs/common';
import { SesSnsEventDto, SesMessage } from '../dto/ses-sns-event.dto';
import { ProcessedEventDto } from '../dto/processed-event.dto';

// Interface Segregation Principle: Define interfaces for different types of verdicts
interface Verdict {
  status: string;
}

interface DnsVerdict {
  spfVerdict: Verdict;
  dkimVerdict: Verdict;
  dmarcVerdict: Verdict;
}

@Injectable()
export class SesSnsEventService {
  // Single Responsibility Principle: This service handles the business logic for processing SES-SNS events
  processEvent(event: SesSnsEventDto): ProcessedEventDto {
    const sesMessage: SesMessage = event.Records[0].ses;
    const processedEvent = new ProcessedEventDto();

    // Open/Closed Principle: We can easily extend this method to add new processing logic
    processedEvent.spam = this.checkVerdict(sesMessage.receipt.spamVerdict);
    processedEvent.virus = this.checkVerdict(sesMessage.receipt.virusVerdict);
    processedEvent.dns = this.checkDnsVerdict(sesMessage.receipt);
    processedEvent.mes = this.getMonthName(sesMessage.mail.timestamp);
    processedEvent.retrasado = this.isDelayed(sesMessage.receipt.processingTimeMillis);
    processedEvent.emisor = this.extractUsername(sesMessage.mail.source);
    processedEvent.receptor = sesMessage.mail.destination.map(this.extractUsername);

    return processedEvent;
  }

  // Private methods to encapsulate specific processing logic
  private checkVerdict(verdict: { status: string }): boolean {
    return verdict.status === 'PASS';
  }

  private checkDnsVerdict(receipt: SesMessage['receipt']): boolean {
    return (
      this.checkVerdict(receipt.spfVerdict) &&
      this.checkVerdict(receipt.dkimVerdict) &&
      this.checkVerdict(receipt.dmarcVerdict)
    );
  }

  private getMonthName(timestamp: string): string {
    return new Date(timestamp).toLocaleString('default', { month: 'long' });
  }

  private isDelayed(processingTimeMillis: number): boolean {
    return processingTimeMillis > 1000;
  }

  private extractUsername(email: string): string {
    return email.split('@')[0];
  }
}
