import { dublicatedEmail, requestError } from "../constants/errors";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { Roles } from "../constants/enums";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { log } from "../server";
import { Like } from "typeorm";

const config = require("../config/configurations");

@autoInjectable()
export class UserService {
  private namespace = "UserService";

  constructor(private repo: DBRepository<User>) {}

  create = async (user: User): Promise<SuccessResponse> => {
    try {
      const existingUser = await this.repo.findOne(User, { email: user.email });
      if (existingUser) throw { errMessage: dublicatedEmail, errno: 400 };
      user = await this.repo.save(user);
      return new SuccessResponse({ id: user.id }, 201);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  update = async (
    id: string,
    name: string,
    email: string,
    password: string,
    tel: string,
    identity: string,
    role: Roles
  ): Promise<SuccessResponse> => {
    try {
      const user = await this.repo.findOne(User, { id: id });
      if (!user) throw { errMessage: requestError, errno: 400 };
      user.email = email;
      user.name = name;
      user.role = role;
      user.tel = tel;
      user.identity = identity;
      user.encryptPassword(password);
      await this.repo.save(user);
      return new SuccessResponse({ id: user.id }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  del = async (id: string): Promise<SuccessResponse> => {
    try {
      const affected = await this.repo.delete(User, id);
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
    const filter = [{ name: Like(criteria) }, { email: Like(criteria) }];
    const projection = {
      id: true,
      tel: true,
      role: true,
      name: true,
      email: true,
      isActive: true,
      identity: true,
    };
    try {
      const count = await this.repo.count(User, filter, relation);
      const users = await this.repo.get(
        User,
        pageNo,
        projection,
        filter,
        relation,
        skip
      );
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

  toggle = async (id: string, isActive: boolean): Promise<SuccessResponse> => {
    try {
      let existingUser = await this.repo.findOne(User, { id: id });
      if (!existingUser) throw { errMessage: requestError, errno: 400 };
      existingUser.isActive = !isActive;
      existingUser = await this.repo.save(existingUser);
      return new SuccessResponse({}, 204);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  basic = async (id: string): Promise<SuccessResponse> => {
    const relation = { messages: true };
    const filter = { id: id };
    const projection = {
      id: true,
      role: true,
      messages: {
        id: true,
        isNew: true,
      },
    };
    try {
      const user = await this.repo.getOne(User, projection, filter, relation);
      if (!user) throw { errMessage: requestError, errno: 400 };
      const newMessages = user.messages?.filter((m) => m.isNew === true).length;
      return new SuccessResponse(
        {
          userRole: user?.role,
          imageURL: `pics/user/${user?.id}`,
          newMessages,
        },
        200
      );
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
