import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { requestError } from "../constants/errors";
import { SubCourse } from "../entities/SubCourse";
import { Message } from "../entities/Message";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { log } from "../server";

@autoInjectable()
export class SubCourseMessageService {
  private namespace = "SubCourseMessageService";

  constructor(
    private subCourseRepo: DBRepository<SubCourse>,
    private messageRepo: DBRepository<Message>
  ) {}

  create = async (
    subject: string,
    details: string,
    subCourseId: string,
    senderId: string
  ): Promise<SuccessResponse> => {
    const filter = { id: subCourseId };
    const relation = { users: { messages: true } };
    const projection = { id: true, users: true };
    try {
      const subCourse = await this.subCourseRepo.getOne(
        SubCourse,
        projection,
        filter,
        relation
      );
      if (!subCourse) throw { errMessage: requestError, errno: 400 };
      subCourse.users?.forEach(async (user) => {
        const message = new Message();
        message.subject = subject;
        message.details = details;
        message.senderId = senderId;
        message.user = user;
        await this.messageRepo.save(message);
      });
      return new SuccessResponse({}, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
