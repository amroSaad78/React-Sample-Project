import { authentication, googleAccount } from "../constants/errors";
import { IMailerOptions } from "../interfaces/IMailerOptions";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { GoogleClient } from "../helper/googleClient";
import { BaseImageService } from "./baseImageService";
import { BlobService } from "./blobService";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { Mailer } from "./mailer";
import { log } from "../server";
const getToken = require("../helper/getToken");
const config = require("../config/configurations");

@autoInjectable()
export class GoogleService extends BaseImageService<User> {
  constructor(
    repo: DBRepository<User>,
    blob: BlobService<User>,
    private mailer: Mailer
  ) {
    super(repo, blob, "GoogleService");
    this.mailer.on(
      "send",
      async (options: IMailerOptions, namespace: string) => {
        await this.mailer.send(options, namespace);
      }
    );
  }

  google = async (token: string): Promise<SuccessResponse> => {
    let existingUser: User | null;
    try {
      const ticket = await GoogleClient.getInstance().verifyIdToken({
        idToken: token,
        audience: config.GOOGLE.clientID,
      });
      const { name, email, picture, email_verified } = ticket.getPayload();

      if (!name || !email || !email_verified)
        throw { errMessage: googleAccount, errno: 401 };

      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) {
        existingUser = new User();
        existingUser.name = name;
        existingUser.email = email;
        existingUser.isVerified = email_verified;
        existingUser.setVerificationCode();
        existingUser.setCodeExpiration();
        existingUser = await this.repo.save(existingUser);
        this.blob.emitDownload(
          this.namespace,
          `${config.BLOB.root}/${config.BLOB.user}`,
          existingUser.id!,
          User,
          picture
        );
      }

      if (!existingUser.isActive)
        throw { errMessage: authentication, errno: 401 };

      token = getToken(existingUser);
      return new SuccessResponse({ token: token }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
