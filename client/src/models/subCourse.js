export class SubCourse {
  constructor(courseId, price, hours, isActive, startDate) {
    this.courseId = courseId;
    this.price = price;
    this.hours = hours;
    this.isActive = isActive;
    this.startDate = startDate;
  }
  courseId;
  price;
  hours;
  isActive;
  startDate;
}
