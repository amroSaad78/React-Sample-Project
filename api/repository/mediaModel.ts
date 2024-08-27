import { BaseModel } from "./baseModel";
import { Column } from "typeorm";

export abstract class MediaModel extends BaseModel {
  @Column({ type: "varchar", length: 16, nullable: true })
  public mime: string | undefined;
}
