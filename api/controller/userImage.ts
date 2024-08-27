import { UserImageService } from "../services/userImageService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import * as messages from "../constants/messages";
import { Validator } from "../helper/validator";
import { autoInjectable } from "tsyringe";

const FileType = require("file-type");
const config = require("../config/configurations");

@autoInjectable()
export class UserImageController {
  constructor(
    private userImageService: UserImageService,
    private validator: Validator
  ) {}

  getImage = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    try {
      const { filePath, options } = await this.userImageService.get(id);
      res.sendFile(filePath, options);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  updateImage = async (req: any, res: Response, next: NextFunction) => {
    const { file } = req.files;
    const { id } = req.params;
    const { mime } = await FileType.fromFile(file?.tempFilePath);
    this.validator
      .reset()
      .isNull(file, "errMessage", messages.requiredFile)
      .isIncluded(
        mime,
        config.ALLOWED_FILES.IMAGES,
        "errMessage",
        messages.invalidFile
      )
      .isValidSize(
        file.size,
        config.MAX_SIZE.IMAGES,
        "errMessage",
        messages.invalidFileSize
      );
    if (this.validator.invalid()) {
      return next(new ErrorResponse(this.validator.errors(), 400));
    }
    try {
      const respone = await this.userImageService.update(
        file.tempFilePath,
        mime,
        id
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const respone = await this.userImageService.delete(id);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  truncateImage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await this.userImageService.truncate(id);
      next();
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
