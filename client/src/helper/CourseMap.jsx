import { addNewCourse, imageUpdate, editCourse } from "../constants/titles";
import CourseInputs from "../components/pages/CourseInputs";
import Image from "../components/pages/Image";
import { Steps } from "../actions/selectors";

const CourseMap = new Map();
CourseMap.set(Steps.Course.New, <CourseInputs title={addNewCourse} />);
CourseMap.set(Steps.Course.Edit, <CourseInputs title={editCourse} />);
CourseMap.set(Steps.Course.Image, <Image title={imageUpdate} />);

export { CourseMap };
