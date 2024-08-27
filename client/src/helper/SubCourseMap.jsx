import SubCourseInputs from "../components/pages/SubCourseInputs";
import { addNewPeriod, editPeriod } from "../constants/titles";
import AssignUsers from "../components/pages/AssignUsers";
import { Steps } from "../actions/selectors";

const SubCourseMap = new Map();
SubCourseMap.set(Steps.SubCourse.New, <SubCourseInputs title={addNewPeriod} />);
SubCourseMap.set(Steps.SubCourse.Edit, <SubCourseInputs title={editPeriod} />);
SubCourseMap.set(Steps.SubCourse.Assign, <AssignUsers />);

export { SubCourseMap };
