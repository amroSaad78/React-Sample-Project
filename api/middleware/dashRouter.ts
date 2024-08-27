import subCourseRouter from "../routes/subCourse";
import assignRouter from "../routes/userAssign";
import messageRouter from "../routes/message";
import courseRouter from "../routes/course";
import userRouter from "../routes/user";
import { Router } from "express";

const dashRouter = Router();

dashRouter.use(
  "",
  userRouter,
  courseRouter,
  subCourseRouter,
  assignRouter,
  messageRouter
);

export default dashRouter;
