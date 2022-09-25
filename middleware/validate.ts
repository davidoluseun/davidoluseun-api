import { Request, Response, NextFunction } from "express";

function validate(validator: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
}

export default validate;


