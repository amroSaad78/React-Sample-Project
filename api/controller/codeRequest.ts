import { CodeRequestService } from "../services/codeRequestService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import * as messages from "../constants/messages";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";
import { Validator } from "../helper/validator";

@autoInjectable()
export class CodeRequestController {
  constructor(
    private codeRequestService: CodeRequestService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  codeRequest = async (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;
    try {
      email = this.decoder.decode(email);
      this.validator
        .reset()
        .isValidEmail(email, "errMessage", messages.invalidEmail)
        .required(email, "errMessage", messages.requiredEmail);
      if (this.validator.invalid()) {
        return next(new ErrorResponse(this.validator.errors(), 400));
      }
      const respone = await this.codeRequestService.request(
        email.trim().toLowerCase()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
