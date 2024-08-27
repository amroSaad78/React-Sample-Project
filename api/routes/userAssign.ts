import { UserAssignController } from "../controller/userAssign";
import { Roles } from "../constants/enums";
import Guard from "../middleware/guard";
import { container } from "tsyringe";
import { Router } from "express";

const assignRouter = Router();

assignRouter
  .route("/assign/user/pages/:pageNo/subcourses/:subCourseId/:criteria?")
  .get(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserAssignController).get
  );

assignRouter
  .route("/assign/user/toggle/:userId")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserAssignController).toggle
  );

export default assignRouter;
