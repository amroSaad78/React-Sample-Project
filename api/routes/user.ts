import { Router } from "express";
import { container } from "tsyringe";
import { Roles, RolesArray } from "../constants/enums";
import { UserBasicController } from "../controller/userBasic";
import { UserImageController } from "../controller/userImage";
import { UserController } from "../controller/user";
import Guard from "../middleware/guard";

const userRouter = Router();

userRouter
  .route("/user/basic")
  .get(
    container.resolve(Guard).setRoles(RolesArray).protect,
    container.resolve(UserBasicController).getUserData
  );

userRouter
  .route("/user")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserController).create
  );

userRouter
  .route("/user/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserController).update
  );

userRouter
  .route("/user/:id")
  .delete(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserImageController).truncateImage,
    container.resolve(UserController).del
  );

userRouter
  .route("/user/pages/:pageNo/:skip/:criteria?")
  .get(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserController).get
  );

userRouter
  .route("/user/image/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserImageController).updateImage
  );

userRouter
  .route("/user/image/:id")
  .delete(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserImageController).deleteImage
  );

userRouter
  .route("/user/toggle/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserController).toggle
  );
export default userRouter;
