import nodemailer from 'nodemailer';
import handlebarsMailTemplate from './HandlebarsMailTamplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact; 
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({to, from, subject, templateData}: ISendMail): Promise<void>  {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
    console.log('Message send: %s', message.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
  }
}