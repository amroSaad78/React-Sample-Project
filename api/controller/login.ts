import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { LoginService } from "../services/loginService";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class LoginController {
  constructor(
    private loginService: LoginService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    try {
      email = this.decoder.decode(email);
      password = this.decoder.decode(password);
      const error = this.validate(email, password);
      if (error) return next(error);
      const respone = await this.loginService.login(
        email.trim().toLowerCase(),
        password.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private validate = (email: string, password: string) => {
    this.validator
      .reset()
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .required(password, "passwordErr", messages.requiredPassword);
    if (!this.validator.invalid()) return undefined;
    this.validator.set("errMessage", requestError);
    return new ErrorResponse(this.validator.errors(), 400);
  };
}
