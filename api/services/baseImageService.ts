import { notFoundFile, requestError } from "../constants/errors";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { MediaModel } from "../repository/mediaModel";
import { BlobService } from "./blobService";
import { EntityTarget } from "typeorm";
import { log } from "../server";

const path = require("path");
const config = require("../config/configurations");

export abstract class BaseImageService<T extends MediaModel> {
  constructor(
    protected repo: DBRepository<T>,
    protected blob: BlobService<T>,
    protected namespace: string
  ) {
    this.blob.on(
      "update",
      async (id: string, mime: string, entity: EntityTarget<T>) => {
        await this.updateMime(id, mime, entity);
      }
    );

    this.blob.on(
      "unlink",
      async (
        namespace: string,
        folder: string,
        fileName: string,
        func: Function
      ) => {
        await this.blob.unlink(namespace, folder, fileName, func);
      }
    );

    this.blob.on(
      "upload",
      (
        namespace: string,
        tempPath: string,
        folder: string,
        fileName: string,
        mime: string,
        entity: EntityTarget<T>
      ) => {
        this.blob.move(namespace, tempPath, folder, fileName, mime, entity);
      }
    );

    this.blob.on(
      "download",
      (
        namespace: string,
        folder: string,
        fileName: string,
        entity: EntityTarget<T>,
        url: string
      ) => {
        this.blob.download(namespace, folder, fileName, entity, url);
      }
    );
  }

  protected getImage = async (
    folder: string,
    fileName: string,
    entity: EntityTarget<T>
  ) => {
    try {
      const result = await this.repo.findOne(entity, { id: fileName });
      if (!result) throw { errMessage: notFoundFile, errno: 404 };
      let rootFolder = config.BLOB.root;
      let filePath = `${folder}/${fileName}`;
      if (!this.blob.exist(`${rootFolder}/${filePath}`)) {
        rootFolder = "../assets";
        filePath = "images/no_image.jpg";
      }
      const options = this.getOptions(result.mime, rootFolder);
      return { filePath, options };
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  protected updateImage = async (
    tempPath: string,
    folder: string,
    fileName: string,
    mime: string,
    entity: EntityTarget<T>
  ): Promise<SuccessResponse> => {
    try {
      const result = await this.repo.findOne(entity, { id: fileName });
      if (!result) throw { errMessage: requestError, errno: 400 };
      this.blob.emitUpload(
        this.namespace,
        tempPath,
        `${config.BLOB.root}/${folder}`,
        fileName,
        mime,
        entity
      );
      return new SuccessResponse({}, 201);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  protected deleteImage = async (
    folder: string,
    fileName: string,
    entity: EntityTarget<T>,
    func: Function
  ): Promise<SuccessResponse> => {
    try {
      const result = await this.repo.findOne(entity, { id: fileName });
      if (!result) throw { errMessage: requestError, errno: 400 };
      this.blob.emitUnlink(
        this.namespace,
        `${config.BLOB.root}/${folder}`,
        fileName,
        func
      );
      return new SuccessResponse({}, 202);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  private updateMime = async (
    id: string,
    mime: string,
    entity: EntityTarget<T>
  ) => {
    try {
      await this.repo.update(
        entity,
        { id: id },
        {
          mime: mime,
        }
      );
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
    }
  };

  private getOptions = (mime: string | undefined, rootFolder: string) => {
    const options = {
      root: path.join(__dirname, rootFolder),
      dotfiles: "deny",
      headers: {
        "Content-Type": mime || "image/jpeg",
        "Cache-Control": "private, max-age=30, must-revalidate",
      },
    };
    return options;
  };
}
