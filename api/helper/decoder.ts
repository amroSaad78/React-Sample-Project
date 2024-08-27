import { injectable, Lifecycle, scoped } from "tsyringe";
import { requestError } from "../constants/errors";

const utf8 = require("utf8");
const base64 = require("base-64");

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class Decoder {
  decode(value: string) {
    try {
      return utf8.decode(base64.decode(value));
    } catch {
      throw { errMessage: requestError, errno: 400 };
    }
  }
}
