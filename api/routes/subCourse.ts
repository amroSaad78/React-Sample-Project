import { Router } from "express";
import { container } from "tsyringe";
import Guard from "../middleware/guard";
import { Roles } from "../constants/enums";
import { SubCourseController } from "../controller/subCourse";

const subCourseRouter = Router();

subCourseRouter
  .route("/subcourse")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseController).create
  );

subCourseRouter
  .route("/subcourse/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseController).update
  );

subCourseRouter
  .route("/subcourse/:id")
  .delete(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseController).del
  );

subCourseRouter
  .route("/subcourse/:courseId/:pageNo/:skip")
  .get(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseController).get
  );

subCourseRouter
  .route("/subcourse/toggle/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(SubCourseController).toggle
  );

export default subCourseRouter;
