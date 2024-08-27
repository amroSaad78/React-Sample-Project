import { Column, Entity, ManyToOne, ManyToMany } from "typeorm";
import { BaseModel } from "../repository/baseModel";
import { Course } from "./Course";
import { User } from "./User";

@Entity({ name: "subcourses" })
export class SubCourse extends BaseModel {
  @Column({ type: "mediumint", default: 0 })
  public price: number | undefined;

  @Column({ type: "smallint", default: 0 })
  public hours: number | undefined;

  @Column({ type: "datetime", default: () => "now()" })
  public startDate: Date | undefined;

  @Column({ type: "bool", default: false })
  public isActive: boolean | undefined;

  @ManyToOne(() => Course, (course) => course.subCourses, {
    onDelete: "CASCADE",
  })
  public course: Course | undefined;

  @ManyToMany(() => User, (user) => user.subcourses)
  public users: User[] | undefined;
}
