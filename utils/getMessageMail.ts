import { MessageTypes } from "../types";

function getMessageMail(message: MessageTypes, recipient: string) {
  const mail = {
    from: message.name,
    to: recipient,
    subject: "New Entry from my Portfolio Website - " + message.subject,
    text: `Client detail: \nName: ${message.name} \nEmail: ${message.email} \nPhone number: ${message.phone} \n\nMessage: \n${message.message}`,
  };

  return mail;
}

export default getMessageMail;
