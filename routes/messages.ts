import Joi from "joi";
import config from "config";
import express from "express";
import JoiPhoneNumber from "joi-phone-number";
import { MessageTypes } from "../types";
import mailConfig from "../mail/mailConfig";
import getMessageMail from "../utils/getMessageMail";

const customJoi = Joi.extend(JoiPhoneNumber);

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const recipient = String(config.get("accessEmail"));
  const mail = getMessageMail(req.body, recipient);

  await mailConfig(mail);
  res.send("Message sent.");
});

function validateMessage(message: MessageTypes) {
  const schema = customJoi.object().keys({
    name: customJoi.string().min(3).required(),
    email: customJoi.string().email().required(),
    subject: customJoi.string().min(2).allow(""),
    phone: customJoi.string().allow("").phoneNumber(),
    message: customJoi.string().min(2).max(1024).required(),
  });

  return schema.validate(message);
}

export default router;
