import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "config";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { MailTypes } from "../types";

const OAuth2 = google.auth.OAuth2,
  clientId = String(config.get("OAuthClientId")),
  clientSecret = String(config.get("OAuthClientSecret")),
  refreshToken = String(config.get("OAuthRefreshToken")),
  accessEmail = String(config.get("accessEmail"));

const oauth2Client = new OAuth2(
  clientId as string,
  clientSecret as string,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ refresh_token: refreshToken as string });
google.options({ auth: oauth2Client });

async function mailConfig(mail: MailTypes) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const auth: SMTPConnection.AuthenticationTypeOAuth2 = {
      type: "OAuth2",
      user: accessEmail,
      clientId,
      clientSecret,
      refreshToken,
      accessToken: String(accessToken),
    };

    const transporter = nodemailer.createTransport({ service: "gmail", auth });

    await transporter.sendMail(mail);
    transporter.close();
  } catch (ex) {
    throw ex;
  }
}

export default mailConfig;
