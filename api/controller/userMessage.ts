import { UserMessageService } from "../services/userMessageService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError, subjectError } from "../constants/errors";
import { Validator } from "../helper/validator";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserMessageController {
  constructor(
    private userMessageService: UserMessageService,
    private validator: Validator
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    let { subject, details, receiverId, userId } = req.body;
    this.validator
      .reset()
      .required(receiverId, "errMessage", requestError)
      .required(subject, "subjectErr", subjectError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userMessageService.create(
        subject,
        details,
        receiverId,
        userId
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    let { subject, details } = req.body;
    this.validator.reset().required(subject, "subjectErr", subjectError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userMessageService.update(
        id,
        subject,
        details
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
