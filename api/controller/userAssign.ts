import { UserAssignService } from "../services/userAssignService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import { Validator } from "../helper/validator";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserAssignController {
  constructor(
    private userAssignService: UserAssignService,
    private validator: Validator
  ) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    let { pageNo, subCourseId, criteria } = req.params;
    this.validator.reset().isNumbersOnly(pageNo, "errMessage", requestError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userAssignService.get(
        parseInt(pageNo),
        subCourseId,
        criteria?.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  toggle = async (req: Request, res: Response, next: NextFunction) => {
    let { userId } = req.params;
    let { subCourseId, checked } = req.body;
    this.validator.reset().required(subCourseId, "errMessage", requestError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userAssignService.toggle(
        userId,
        subCourseId,
        !!checked
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
