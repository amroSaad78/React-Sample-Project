import { DBRepository } from "../repository/repository";
import { BaseImageService } from "./baseImageService";
import { BlobService } from "./blobService";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";

const config = require("../config/configurations");

@autoInjectable()
export class UserImageService extends BaseImageService<User> {
  constructor(repo: DBRepository<User>, blob: BlobService<User>) {
    super(repo, blob, "UserImageService");
  }

  update = async (tempPath: string, mime: string, fileName: string) => {
    return await this.updateImage(
      tempPath,
      config.BLOB.user,
      fileName,
      mime,
      User
    );
  };

  delete = async (fileName: string) => {
    return await this.deleteImage(config.BLOB.user, fileName, User, () =>
      this.blob.emitUpdate(fileName, "", User)
    );
  };

  truncate = async (fileName: string) => {
    return await this.deleteImage(config.BLOB.user, fileName, User, () => {});
  };

  get = async (fileName: string) => {
    return await this.getImage(config.BLOB.user, fileName, User);
  };
}
