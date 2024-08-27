import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { requestError } from "../constants/errors";
import { SubCourse } from "../entities/SubCourse";
import { Course } from "../entities/Course";
import { autoInjectable } from "tsyringe";
import { log } from "../server";

const config = require("../config/configurations");

@autoInjectable()
export class SubCourseService {
  private namespace = "SubCourseService";

  constructor(
    private subCourserepo: DBRepository<SubCourse>,
    private courserepo: DBRepository<Course>
  ) {}

  create = async (
    courseId: string,
    price: number,
    hours: number,
    isActive: boolean,
    startDate: Date
  ): Promise<SuccessResponse> => {
    try {
      const course = await this.courserepo.findOne(Course, {
        id: courseId,
      });
      if (!course) throw { errMessage: requestError, errno: 400 };
      const subcourse = new SubCourse();
      subcourse.price = price;
      subcourse.hours = hours;
      subcourse.startDate = startDate;
      subcourse.isActive = isActive;
      subcourse.course = course;
      const subCourse = await this.subCourserepo.save(subcourse);
      return new SuccessResponse({ id: subCourse.id }, 201);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  update = async (
    id: string,
    price: number,
    hours: number,
    startDate: Date,
    isActive: boolean
  ): Promise<SuccessResponse> => {
    try {
      const subCourse = await this.subCourserepo.findOne(SubCourse, {
        id: id,
      });
      if (!subCourse) throw { errMessage: requestError, errno: 400 };
      subCourse.price = price;
      subCourse.hours = hours;
      subCourse.startDate = startDate;
      subCourse.isActive = isActive;
      await this.subCourserepo.save(subCourse);
      return new SuccessResponse({ id: subCourse.id }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  del = async (id: string): Promise<SuccessResponse> => {
    try {
      const affected = await this.subCourserepo.delete(SubCourse, id);
      return new SuccessResponse({ affected: affected }, 202);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  get = async (
    courseId: string,
    pageNo: number,
    skip: number
  ): Promise<SuccessResponse> => {
    const filter = [{ course: { id: courseId } }];
    const relation = { course: true };
    const projection = {
      id: true,
      price: true,
      hours: true,
      startDate: true,
      isActive: true,
      course: {
        id: true,
      },
    };
    try {
      const count = await this.subCourserepo.count(SubCourse, filter, relation);
      const subcourses = await this.subCourserepo.get(
        SubCourse,
        pageNo,
        projection,
        filter,
        relation,
        skip
      );
      const pageSize = parseInt(config.PAGE_SIZE);
      const pages = Math.ceil(count / pageSize) - 1;
      return new SuccessResponse(
        {
          subcourses: subcourses,
          next: pageNo < pages ? pageNo + 1 : pages,
        },
        200
      );
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  toggle = async (id: string, isActive: boolean): Promise<SuccessResponse> => {
    try {
      let subCourse = await this.subCourserepo.findOne(SubCourse, { id: id });
      if (!subCourse) throw { errMessage: requestError, errno: 400 };
      subCourse.isActive = !isActive;
      subCourse = await this.subCourserepo.save(subCourse);
      return new SuccessResponse({}, 204);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
