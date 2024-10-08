// Single Responsibility Principle: This DTO is responsible for defining the structure of the incoming SES-SNS event
export class SesSnsEventDto {
  Records: {
    eventVersion: string;
    eventSource: string;
    ses: SesMessage;
  }[];
}

// Single Responsibility Principle: This class represents the structure of an SES message
export class SesMessage {
  receipt: {
    timestamp: string;
    processingTimeMillis: number;
    recipients: string[];
    spamVerdict: {
      status: string;
    };
    virusVerdict: {
      status: string;
    };
    spfVerdict: {
      status: string;
    };
    dkimVerdict: {
      status: string;
    };
    dmarcVerdict: {
      status: string;
    };
    dmarcPolicy: string;
    action: {
      type: string;
      topicArn: string;
    };
  };
  mail: {
    timestamp: string;
    source: string;
    messageId: string;
    destination: string[];
    headersTruncated: boolean;
    headers: {
      name: string;
      value: string;
    }[];
    commonHeaders: {
      returnPath: string;
      from: string[];
      date: string;
      to: string[];
      messageId: string;
      subject: string;
    };
  };
}
