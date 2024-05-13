import { MailerService } from '@nestjs-modules/mailer';

export const mailerServiceMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn().mockResolvedValue(true),
  },
};
