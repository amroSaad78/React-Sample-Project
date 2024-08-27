import { MediaModel } from "../repository/mediaModel";
import { Column, Entity, OneToMany } from "typeorm";
import { SubCourse } from "./SubCourse";

@Entity({ name: "courses" })
export class Course extends MediaModel {
  @Column({ type: "nvarchar", length: 100, nullable: false, unique: true })
  public name: string | undefined;

  @Column({ type: "nvarchar", length: 1000, nullable: true })
  public details: string | undefined;

  @OneToMany(() => SubCourse, (subCourse) => subCourse.course)
  public subCourses: SubCourse[] | undefined;
}
