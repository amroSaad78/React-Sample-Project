import { DBSource } from "../server";
import { BaseModel } from "./baseModel";
import { injectable, Lifecycle, scoped } from "tsyringe";
import { DeleteResult, EntityTarget } from "typeorm";
import { User } from "../entities/User";

const config = require("../config/configurations");

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class DBRepository<T extends BaseModel> {
  constructor() {}
  save = async (item: T): Promise<T> => {
    try {
      return await DBSource.manager.save(item);
    } catch (err) {
      throw err;
    }
  };

  delete = async (
    entity: EntityTarget<T>,
    id: string
  ): Promise<DeleteResult> => {
    try {
      return await DBSource.manager.delete(entity, id);
    } catch (err) {
      throw err;
    }
  };

  update = async (entity: EntityTarget<T>, criteria: object, query: object) => {
    try {
      await DBSource.manager.update(entity, criteria, query);
    } catch (err) {
      throw err;
    }
  };

  findOne = async (entity: EntityTarget<T>, filter: {}): Promise<T | null> => {
    try {
      return await DBSource.manager.findOne<T>(entity, { where: filter });
    } catch (err) {
      throw err;
    }
  };

  count = async (
    entity: EntityTarget<T>,
    filter: Array<object>,
    relation: object
  ): Promise<number> => {
    try {
      return await DBSource.manager.count<T>(entity, {
        where: filter,
        relations: relation,
      });
    } catch (err) {
      throw err;
    }
  };

  get = async (
    entity: EntityTarget<T>,
    pageNo: number,
    projection: object,
    filter: Array<object>,
    relation: object,
    skip: number = 0
  ): Promise<T[]> => {
    try {
      const pageSize = parseInt(config.PAGE_SIZE);
      skip = pageNo * pageSize < skip ? 0 : skip;
      return await DBSource.manager.find(entity, {
        skip: pageNo * pageSize - skip,
        take: pageSize,
        relations: relation,
        select: projection,
        where: filter,
      });
    } catch (err) {
      throw err;
    }
  };

  getOne = async (
    entity: EntityTarget<T>,
    projection: object,
    filter: object,
    relation: object
  ): Promise<T | null> => {
    try {
      return await DBSource.manager.findOne(entity, {
        relations: relation,
        select: projection,
        where: filter,
      });
    } catch (err) {
      throw err;
    }
  };
}
