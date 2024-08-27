import { DBRepository } from "../repository/repository";
import { BaseImageService } from "./baseImageService";
import { BlobService } from "./blobService";
import { autoInjectable } from "tsyringe";
import { Course } from "../entities/Course";

const config = require("../config/configurations");

@autoInjectable()
export class CourseImageService extends BaseImageService<Course> {
  constructor(repo: DBRepository<Course>, blob: BlobService<Course>) {
    super(repo, blob, "CourseImageService");
  }

  update = async (tempPath: string, mime: string, fileName: string) => {
    return await this.updateImage(
      tempPath,
      config.BLOB.course,
      fileName,
      mime,
      Course
    );
  };

  delete = async (fileName: string) => {
    return await this.deleteImage(config.BLOB.course, fileName, Course, () =>
      this.blob.emitUpdate(fileName, "", Course)
    );
  };

  truncate = async (fileName: string) => {
    return await this.deleteImage(
      config.BLOB.course,
      fileName,
      Course,
      () => {}
    );
  };

  get = async (fileName: string) => {
    return await this.getImage(config.BLOB.course, fileName, Course);
  };
}
