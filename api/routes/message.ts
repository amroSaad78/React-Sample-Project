import { SubCourseMessageController } from "../controller/subCourseMessage";
import { UserMessageController } from "../controller/userMessage";
import { Roles } from "../constants/enums";
import Guard from "../middleware/guard";
import { container } from "tsyringe";
import { Router } from "express";

const messageRouter = Router();

messageRouter
  .route("/message/user")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserMessageController).create
  );

messageRouter
  .route("/message/subcourse")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseMessageController).create
  );

messageRouter
  .route("/message/user/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserMessageController).update
  );

export default messageRouter;
