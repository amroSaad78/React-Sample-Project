import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { UserService } from "../services/userService";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserBasicController {
  constructor(private userService: UserService) {}
  getUserData = async (req: Request, res: Response, next: NextFunction) => {
    let { userId } = req.body;
    try {
      const respone = await this.userService.basic(userId);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
