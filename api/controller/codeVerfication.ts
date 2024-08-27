import { VerficationService } from "../services/verficationService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CodeVerficationController {
  constructor(
    private verficationService: VerficationService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    let { email, code } = req.body;
    try {
      email = this.decoder.decode(email);
      code = this.decoder.decode(code);
      this.validator
        .reset()
        .isValidEmail(email, "errMessage", messages.invalidEmail)
        .required(email, "errMessage", messages.requiredEmail)
        .required(code, "codeErr", messages.requiredVerfCode);
      if (this.validator.invalid()) {
        return next(new ErrorResponse(this.validator.errors(), 400));
      }
      const respone = await this.verficationService.verify(
        email.trim().toLowerCase(),
        code.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
