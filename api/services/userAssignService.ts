import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { requestError } from "../constants/errors";
import { SubCourse } from "../entities/SubCourse";
import { Roles } from "../constants/enums";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { Like, Not } from "typeorm";
import { log } from "../server";

const config = require("../config/configurations");

@autoInjectable()
export class UserAssignService {
  private namespace = "UserAssignService";

  constructor(
    private userRepo: DBRepository<User>,
    private subCourseRepo: DBRepository<SubCourse>
  ) {}

  get = async (
    pageNo: number,
    subCourseId: string,
    criteria: string
  ): Promise<SuccessResponse> => {
    criteria = criteria ? `%${criteria}%` : "%";
    const filter = [
      { name: Like(criteria), role: Not(Roles.ADMIN) },
      { email: Like(criteria), role: Not(Roles.ADMIN) },
    ];
    const projection = {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      subcourses: { id: true },
    };
    try {
      const count = await this.userRepo.count(User, filter, {});
      const result = await this.userRepo.get(User, pageNo, projection, filter, {
        subcourses: true,
      });
      const users = result.map((user) => {
        const subCourses = user.subcourses;
        delete user.subcourses;
        return subCourses?.find((sub) => sub.id === subCourseId)
          ? { ...user, checked: true }
          : { ...user, checked: false };
      });
      const pageSize = parseInt(config.PAGE_SIZE);
      const pages = Math.ceil(count / pageSize) - 1;
      return new SuccessResponse(
        { users: users, next: pageNo < pages ? pageNo + 1 : pages },
        200
      );
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  toggle = async (
    userId: string,
    subCourseId: string,
    checked: boolean
  ): Promise<SuccessResponse> => {
    try {
      const user = await this.userRepo.getOne(
        User,
        { id: true, subcourses: { id: true } },
        { id: userId },
        { subcourses: true }
      );
      const subCourse = await this.subCourseRepo.findOne(SubCourse, {
        id: subCourseId,
      });
      if (!user || !subCourse) throw { errMessage: requestError, errno: 400 };
      const isExist = user.subcourses?.find((s) => s.id === subCourseId);
      if ((checked && isExist) || (!checked && !isExist)) {
        return new SuccessResponse({}, 200);
      }
      if (checked && !isExist) {
        user.subcourses?.push(subCourse);
        await this.userRepo.save(user);
        return new SuccessResponse({}, 200);
      }
      user.subcourses = user.subcourses?.filter((s) => s.id !== subCourseId);
      await this.userRepo.save(user);
      return new SuccessResponse({}, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
