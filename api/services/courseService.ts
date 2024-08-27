import { dublicatedCourse, requestError } from "../constants/errors";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { Course } from "../entities/Course";
import { autoInjectable } from "tsyringe";
import { log } from "../server";
import { Like } from "typeorm";

const config = require("../config/configurations");

@autoInjectable()
export class CourseService {
  private namespace = "CourseService";

  constructor(private repo: DBRepository<Course>) {}

  create = async (course: Course): Promise<SuccessResponse> => {
    try {
      const existingCourse = await this.repo.findOne(Course, {
        name: course.name,
      });
      if (existingCourse) throw { errMessage: dublicatedCourse, errno: 400 };
      course = await this.repo.save(course);
      return new SuccessResponse({ id: course.id }, 201);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  update = async (
    id: string,
    name: string,
    details: string
  ): Promise<SuccessResponse> => {
    try {
      const course = await this.repo.findOne(Course, { id: id });
      if (!course) throw { errMessage: requestError, errno: 400 };
      course.name = name;
      course.details = details;
      await this.repo.save(course);
      return new SuccessResponse({ id: course.id }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  del = async (id: string): Promise<SuccessResponse> => {
    try {
      const affected = await this.repo.delete(Course, id);
      return new SuccessResponse({ affected: affected }, 202);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  get = async (
    pageNo: number,
    skip: number,
    criteria: string
  ): Promise<SuccessResponse> => {
    criteria = criteria ? `%${criteria}%` : "%";
    const relation = {};
    const filter = [{ name: Like(criteria) }];
    const projection = {
      id: true,
      name: true,
      details: true,
    };
    try {
      const count = await this.repo.count(Course, filter, relation);
      const courses = await this.repo.get(
        Course,
        pageNo,
        projection,
        filter,
        relation,
        skip
      );
      const pageSize = parseInt(config.PAGE_SIZE);
      const pages = Math.ceil(count / pageSize) - 1;
      return new SuccessResponse(
        { courses: courses, next: pageNo < pages ? pageNo + 1 : pages },
        200
      );
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
