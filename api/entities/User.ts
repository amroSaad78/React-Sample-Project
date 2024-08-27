import { Column, Entity, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { MediaModel } from "../repository/mediaModel";
const getUTCDate = require("../helper/getUTCDate");
import { Roles } from "../constants/enums";
import { SubCourse } from "./SubCourse";
import { Message } from "./Message";
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

@Entity({ name: "users" })
export class User extends MediaModel {
  @Column({ type: "nvarchar", length: 50, nullable: false })
  public name: string | undefined;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  public email: string | undefined;

  @Column({ type: "varchar", length: 100, nullable: true })
  private password: string | undefined;

  @Column({ type: "nvarchar", length: 11, nullable: true })
  public tel: string | undefined;

  @Column({ type: "nvarchar", length: 10, nullable: true })
  public identity: string | undefined;

  @Column({ type: "bool", default: true })
  public isActive: boolean | undefined;

  @Column({ type: "bool", default: false })
  public isVerified: boolean | undefined;

  @Column({ type: "enum", enum: Roles, default: Roles.TRAINEE })
  public role: Roles | undefined;

  @Column({ type: "nvarchar", length: 12, nullable: true })
  private verificationCode: string | undefined;

  @Column({ type: "datetime", nullable: true })
  private codeExpiration: Date | undefined;

  @OneToMany(() => Message, (message) => message.user)
  public messages: Message[] | undefined;

  @ManyToMany(() => SubCourse, (subCourse) => subCourse.users)
  @JoinTable()
  public subcourses: SubCourse[] | undefined;

  async encryptPassword(password?: string) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(
      password ? password : this.password,
      salt
    );
  }

  setVerificationCode() {
    this.verificationCode = crypto.randomBytes(6).toString("hex");
  }

  setCodeExpiration() {
    this.codeExpiration = getUTCDate(1, 0, 0);
  }

  getVerificationCode = () => this.verificationCode;
  getCodeExpiration = () => this.codeExpiration;
  getPassword = () => this.password;
}
