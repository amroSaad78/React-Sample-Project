import { injectable } from "tsyringe";
import { BaseModel } from "../repository/baseModel";
import { EntityTarget } from "typeorm";
import EventEmitter from "events";
import { log } from "../server";
const fs = require("fs");
const path = require("path");
const https = require("https");
const FileType = require("file-type");
const config = require("../config/configurations");

@injectable()
export class BlobService<T extends BaseModel> extends EventEmitter {
  emitDownload = (
    namespace: string,
    folder: string,
    fileName: string,
    entity: EntityTarget<T>,
    url?: string
  ) => {
    if (!url) return;
    this.emit("download", namespace, folder, fileName, entity, url);
  };

  emitUpload = (
    namespace: string,
    tempPath: string,
    folder: string,
    fileName: string,
    mime: string,
    entity: EntityTarget<T>
  ) => {
    this.emit("upload", namespace, tempPath, folder, fileName, mime, entity);
  };

  emitUnlink = (
    namespace: string,
    folder: string,
    fileName: string,
    func: Function
  ) => {
    this.emit("unlink", namespace, folder, fileName, func);
  };

  emitUpdate = (fileName: string, mime: string, entity: EntityTarget<T>) =>
    this.emit("update", fileName, mime, entity);

  download = (
    namespace: string,
    folder: string,
    fileName: string,
    entity: EntityTarget<T>,
    url: string
  ) => {
    https.get(url, (res: any) => {
      let data: Uint8Array[] = [];
      res.on("data", (chunk: any) => {
        data.push(chunk);
      });

      res.on("end", async () => {
        let buffer = Buffer.concat(data);
        const { mime } = await FileType.fromBuffer(buffer);
        if (!config.ALLOWED_FILES.IMAGES.includes(mime)) return;
        if (config.MAX_SIZE.IMAGES < Buffer.byteLength(buffer)) return;
        const filePath = path.join(__dirname, `${folder}/${fileName}`);
        if (!this.createDirIfNotExist(filePath)) return;
        fs.writeFile(filePath, buffer, (err: any) => {
          if (err) {
            log.error(`${err.message} | ${namespace}`);
            return;
          }
          this.emitUpdate(fileName, mime, entity);
        });
      });

      res.on("error", (err: any) => {
        log.error(`${err.message} | ${namespace}`);
      });
    });
  };

  move = (
    namespace: string,
    tempPath: string,
    folder: string,
    fileName: string,
    mime: string,
    entity: EntityTarget<T>
  ) => {
    const filePath = path.join(__dirname, `${folder}/${fileName}`);
    if (!this.createDirIfNotExist(filePath)) return;
    fs.rename(tempPath, filePath, (err: any) => {
      if (err) {
        log.error(`${err.message} | ${namespace}`);
        return;
      }
      this.emitUpdate(fileName, mime, entity);
    });
  };

  unlink = async (
    namespace: string,
    folder: string,
    fileName: string,
    func: Function
  ) => {
    const filePath = path.join(__dirname, `${folder}/${fileName}`);
    if (!fs.existsSync(filePath)) return;
    try {
      await fs.promises.unlink(filePath);
      func();
    } catch (err: any) {
      log.error(`${err.message} | ${namespace}`);
    }
  };

  exist = (filePath: string): boolean => {
    if (fs.existsSync(path.join(__dirname, filePath))) return true;
    return false;
  };

  private createDirIfNotExist = (filePath: string): boolean => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    try {
      fs.mkdirSync(dirname, { recursive: true });
      return true;
    } catch {
      return false;
    }
  };
}
