import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import handlebarsMailTemplate from '@/config/mail/HandlebarsMailTamplate';
import mailConfig from '@/config/mail/mail';


interface ITemplateVariable {
  [key: string]: string | number;
};

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
};

interface IMailContact {
  name: string;
  email: string;
};

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
};

export default class SESMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      }),
    });

    const { email, name } = mailConfig.defaults.from


    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  };
};