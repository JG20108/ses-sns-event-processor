export class SesSnsEventDto {
  Records: {
    EventSource: string;
    EventVersion: string;
    Sns: {
      Type: string;
      MessageId: string;
      TopicArn: string;
      Subject: string;
      Message: string;
      Timestamp: string;
      SignatureVersion: string;
      Signature: string;
      SigningCertUrl: string;
      UnsubscribeUrl: string;
    };
  }[];
}

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
