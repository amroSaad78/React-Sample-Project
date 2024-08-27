import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
} from "typeorm";
import { BaseModel } from "../repository/baseModel";
import { User } from "./User";

@Entity({ name: "messages" })
export class Message extends BaseModel {
  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date | undefined;

  @Column({ type: "nvarchar", length: 100, nullable: false })
  public subject: string | undefined;

  @Column({ type: "nvarchar", length: 2000, nullable: true })
  public details: string | undefined;

  @Column({ type: "bool", default: true })
  public isNew: boolean | undefined;

  @PrimaryColumn("uuid")
  public senderId: string | undefined;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: "CASCADE",
  })
  public user: User | undefined;
}
