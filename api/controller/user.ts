import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { UserService } from "../services/userService";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { RolesArray } from "../constants/enums";
import { Validator } from "../helper/validator";
import { Decoder } from "../helper/decoder";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";

@autoInjectable()
export class UserController {
  constructor(
    private userService: UserService,
    private validator: Validator,
    private decoder: Decoder
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, tel, identity, role } = req.body;
    try {
      email = this.decoder.decode(email);
      password = this.decoder.decode(password);
      const error = this.validate(name, email, password, tel, identity, role);
      if (error) return next(error);
      const user = new User();
      user.name = name.trim();
      user.email = email.trim().toLowerCase();
      user.identity = identity;
      user.tel = tel;
      user.role = role;
      await user.encryptPassword(password.trim());
      user.setVerificationCode();
      user.setCodeExpiration();
      const respone = await this.userService.create(user);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    let { name, email, password, tel, identity, role } = req.body;
    try {
      email = this.decoder.decode(email);
      password = this.decoder.decode(password);
      const error = this.validate(name, email, password, tel, identity, role);
      if (error) return next(error);

      const respone = await this.userService.update(
        id,
        name.trim(),
        email.trim().toLowerCase(),
        password.trim(),
        tel,
        identity,
        role
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    try {
      const respone = await this.userService.del(id);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    let { pageNo, skip, criteria } = req.params;
    this.validator
      .reset()
      .isNumbersOnly(pageNo, "errMessage", requestError)
      .isNumbersOnly(skip, "errMessage", requestError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userService.get(
        parseInt(pageNo),
        parseInt(skip),
        criteria?.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  toggle = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    let { isActive } = req.body;
    try {
      const respone = await this.userService.toggle(id, !!isActive);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private validate = (
    name: string,
    email: string,
    password: string,
    tel: string,
    identity: string,
    role: string
  ) => {
    this.validator
      .reset()
      .between(name, 3, 50, "nameErr", messages.invalidName)
      .required(name, "nameErr", messages.requiredName)
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .isValidTel(tel, "telErr", messages.invalidTel)
      .required(tel, "telErr", messages.requiredTel)
      .isValidLength(identity, 10, "identityErr", messages.invalidIdentity)
      .required(identity, "identityErr", messages.requiredIdentity)
      .isSecure(password, "passwordErr", messages.weakPassword)
      .required(password, "passwordErr", messages.requiredPassword)
      .isIncluded(role, RolesArray, "roleErr", messages.invalidRole)
      .required(role, "roleErr", messages.requiredRole);
    if (!this.validator.invalid()) return undefined;
    this.validator.set("errMessage", requestError);
    return new ErrorResponse(this.validator.errors(), 400);
  };
}
