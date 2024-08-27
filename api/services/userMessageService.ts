import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { requestError } from "../constants/errors";
import { Message } from "../entities/Message";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { log } from "../server";

@autoInjectable()
export class UserMessageService {
  private namespace = "UserMessageService";

  constructor(
    private userRepo: DBRepository<User>,
    private messageRepo: DBRepository<Message>
  ) {}

  create = async (
    subject: string,
    details: string,
    receiverId: string,
    senderId: string
  ): Promise<SuccessResponse> => {
    const filter = { id: receiverId };
    const relation = {};
    const projection = {};
    try {
      const receiver = await this.userRepo.getOne(
        User,
        projection,
        filter,
        relation
      );
      if (!receiver) throw { errMessage: requestError, errno: 400 };
      const message = new Message();
      message.subject = subject;
      message.details = details;
      message.senderId = senderId;
      message.user = receiver;
      await this.messageRepo.save(message);
      return new SuccessResponse({ id: message.id }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  update = async (
    id: string,
    subject: string,
    details: string
  ): Promise<SuccessResponse> => {
    const filter = { id: id };
    try {
      const message = await this.messageRepo.findOne(Message, filter);
      if (!message) throw { errMessage: requestError, errno: 400 };
      message.subject = subject;
      message.details = details;
      await this.messageRepo.save(message);
      return new SuccessResponse({ id: message.id }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
