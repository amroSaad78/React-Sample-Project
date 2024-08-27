import { NextFunction, Request, Response } from "express";
import { CourseService } from "../services/courseService";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { Course } from "../entities/Course";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CourseController {
  constructor(
    private courseService: CourseService,
    private validator: Validator
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    let { name, details } = req.body;
    const error = this.validate(name);
    if (error) return next(error);
    const course = new Course();
    course.name = name.trim();
    course.details = details.trim();
    try {
      const respone = await this.courseService.create(course);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    let { name, details } = req.body;
    const error = this.validate(name);
    if (error) return next(error);
    try {
      const respone = await this.courseService.update(
        id,
        name.trim(),
        details.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    try {
      const respone = await this.courseService.del(id);
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
      const respone = await this.courseService.get(
        parseInt(pageNo),
        parseInt(skip),
        criteria?.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private validate = (name: string) => {
    this.validator
      .reset()
      .between(name, 3, 100, "nameErr", messages.invalidName)
      .required(name, "nameErr", messages.requiredName);
    if (!this.validator.invalid()) return undefined;
    this.validator.set("errMessage", requestError);
    return new ErrorResponse(this.validator.errors(), 400);
  };
}
