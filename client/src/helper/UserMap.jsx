import { addNewUser, imageUpdate, editUser } from "../constants/titles";
import UserInputs from "../components/pages/UserInputs";
import Image from "../components/pages/Image";
import { Steps } from "../actions/selectors";

const UserMap = new Map();
UserMap.set(Steps.User.New, <UserInputs title={addNewUser} />);
UserMap.set(Steps.User.Edit, <UserInputs title={editUser} />);
UserMap.set(Steps.User.Image, <Image title={imageUpdate} />);

export { UserMap };
