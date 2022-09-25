import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

function validateId(req: Request, res: Response, next: NextFunction) {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).send("Invalid ID");

  next();
}

export default validateId;
