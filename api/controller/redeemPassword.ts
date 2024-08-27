import { RedeemPasswordService } from "../services/redeemPasswordService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class RedeemPasswordController {
  constructor(
    private redeemPasswordService: RedeemPasswordService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  codeRequest = async (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;
    try {
      email = this.decoder.decode(email);
      this.validator
        .reset()
        .isValidEmail(email, "emailErr", messages.invalidEmail)
        .required(email, "emailErr", messages.requiredEmail);
      if (this.validator.invalid()) {
        this.validator.set("errMessage", requestError);
        return next(new ErrorResponse(this.validator.errors(), 400));
      }
      const respone = await this.redeemPasswordService.request(
        email.trim().toLowerCase()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

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
      const respone = await this.redeemPasswordService.verify(
        email.trim().toLowerCase(),
        code.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
