import { Router } from "express";
import { container } from "tsyringe";
import Guard from "../middleware/guard";
import { Roles } from "../constants/enums";
import { CourseController } from "../controller/course";
import { CourseImageController } from "../controller/courseImage";

const courseRouter = Router();

courseRouter
  .route("/course")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseController).create
  );

courseRouter
  .route("/course/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseController).update
  );

courseRouter
  .route("/course/:id")
  .delete(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseImageController).truncateImage,
    container.resolve(CourseController).del
  );

courseRouter
  .route("/course/pages/:pageNo/:skip/:criteria?")
  .get(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseController).get
  );

courseRouter
  .route("/course/image/:id")
  .put(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseImageController).updateImage
  );

courseRouter
  .route("/course/image/:id")
  .delete(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(CourseImageController).deleteImage
  );
export default courseRouter;
