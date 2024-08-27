import { SubCourseService } from "../services/subCourseService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { Validator } from "../helper/validator";
import * as errors from "../constants/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SubCourseController {
  constructor(
    private subCourseService: SubCourseService,
    private validator: Validator
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    let { courseId, price, hours, isActive, startDate } = req.body;
    const error = this.validate(price, hours, startDate);
    if (error) return next(error);
    if (!courseId)
      return next(new ErrorResponse({ errMessage: errors.requestError }, 400));
    try {
      const respone = await this.subCourseService.create(
        courseId,
        parseInt(price),
        parseInt(hours),
        !!isActive,
        startDate
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    let { price, hours, isActive, startDate } = req.body;
    const error = this.validate(price, hours, startDate);
    if (error) return next(error);
    try {
      const respone = await this.subCourseService.update(
        id,
        parseInt(price),
        parseInt(hours),
        startDate,
        !!isActive
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    try {
      const respone = await this.subCourseService.del(id);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    let { courseId, pageNo, skip } = req.params;
    this.validator
      .reset()
      .isNumbersOnly(pageNo, "errMessage", errors.requestError)
      .isNumbersOnly(skip, "errMessage", errors.requestError);
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.subCourseService.get(
        courseId,
        parseInt(pageNo),
        parseInt(skip)
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
      const respone = await this.subCourseService.toggle(id, !!isActive);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private validate = (price: string, hours: string, startDate: string) => {
    this.validator
      .reset()
      .isNumbersOnly(price, "priceErr", errors.invalidPrice)
      .required(price, "priceErr", errors.requiredPrice)
      .isNumbersOnly(hours, "hoursErr", errors.invalidHours)
      .required(hours, "hoursErr", errors.requiredHours)
      .isValidDate(startDate, "startDateErr", errors.invalidStartDate);
    if (!this.validator.invalid()) return undefined;
    this.validator.set("errMessage", errors.requestError);
    return new ErrorResponse(this.validator.errors(), 400);
  };
}
