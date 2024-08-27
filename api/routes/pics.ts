import { Router } from "express";
import { container } from "tsyringe";
import { UserImageController } from "../controller/userImage";
import { CourseImageController } from "../controller/courseImage";

const picsRouter = Router();

picsRouter
  .route("/user/:id")
  .get(container.resolve(UserImageController).getImage);

picsRouter
  .route("/course/:id")
  .get(container.resolve(CourseImageController).getImage);

export default picsRouter;
