import { SubCourseMessageService } from "../services/subCourseMessageService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError, subjectError } from "../constants/errors";
import { Validator } from "../helper/validator";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SubCourseMessageController {
  constructor(
    private subCourseMessageService: SubCourseMessageService,
    private validator: Validator
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    let { subject, details, subCourseId, userId } = req.body;
    this.validator
      .reset()
      .required(subCourseId, "errMessage", requestError)
      .required(subject, "subjectErr", subjectError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.subCourseMessageService.create(
        subject,
        details,
        subCourseId,
        userId
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
