import { RegisterService } from "../services/registerService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";

@autoInjectable()
export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;
    try {
      email = this.decoder.decode(email);
      password = this.decoder.decode(password);
      const error = this.validate(name, email, password);
      if (error) return next(error);
      const user = new User();
      user.name = name.trim();
      user.email = email.trim().toLowerCase();
      await user.encryptPassword(password.trim());
      user.setVerificationCode();
      user.setCodeExpiration();
      const respone = await this.registerService.register(user);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private validate = (name: string, email: string, password: string) => {
    this.validator
      .reset()
      .between(name, 3, 50, "nameErr", messages.invalidName)
      .required(name, "nameErr", messages.requiredName)
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .isSecure(password, "passwordErr", messages.weakPassword)
      .required(password, "passwordErr", messages.requiredPassword);
    if (!this.validator.invalid()) return undefined;
    this.validator.set("errMessage", requestError);
    return new ErrorResponse(this.validator.errors(), 400);
  };
}
