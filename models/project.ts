import { Schema, model } from "mongoose";
import Joi from "joi";
import { projectTypes } from "../types";

const projectSchema = new Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  repo: { type: String, minlength: 5, maxlength: 255, required: true },
  link: { type: String, minlength: 5, maxlength: 255, required: true },
  desc: { type: String, minlength: 5, maxlength: 555, required: true },
  stack: {
    type: [String],
    validate: [
      ({ length }: string[]) => length >= 2 && length <= 4,
      "{PATH} must contain at least 2 and at most 4 items",
    ],
    required: true,
  },
});

export const Project = model("Project", projectSchema);

export const validateProject = function (project: projectTypes) {
  const schema = Joi.object().keys({
    stack: Joi.array().min(2).max(4).required(),
    name: Joi.string().min(5).max(50).required(),
    desc: Joi.string().min(5).max(555).required(),
    repo: Joi.string().min(5).max(255).required(),
    link: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(project);
};
