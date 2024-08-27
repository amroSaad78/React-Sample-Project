import { NextFunction, Request, Response } from "express";
import { GoogleService } from "../services/googleService";
import { ErrorResponse } from "../helper/errorResponse";
import { authentication } from "../constants/errors";
import { Validator } from "../helper/validator";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class GoogleController {
  constructor(
    private googleService: GoogleService,
    private validator: Validator
  ) {}

  googleChecking = async (req: Request, res: Response, next: NextFunction) => {
    let { tokenId } = req.body;
    this.validator.reset().required(tokenId, "errMessage", authentication);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 401));
    }
    try {
      const respone = await this.googleService.google(tokenId);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
