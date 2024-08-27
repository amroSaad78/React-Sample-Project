import VerficationForm from "../components/forms/VerficationForm";
import RegisterForm from "../components/forms/RegisterForm";
import { LeftForm, RightForm } from "../actions/selectors";
import RedeemForm from "../components/forms/RedeemForm";
import LoginForm from "../components/forms/LoginForm";

const LeftFormMap = new Map();
LeftFormMap.set(LeftForm.Login, <LoginForm />);
LeftFormMap.set(
  LeftForm.Verfication,
  <VerficationForm direction="left-form" />
);
LeftFormMap.set(LeftForm.Redeem, <RedeemForm />);

const RightFormMap = new Map();
RightFormMap.set(RightForm.Register, <RegisterForm />);
RightFormMap.set(
  RightForm.Verfication,
  <VerficationForm direction="right-form" />
);

export { LeftFormMap, RightFormMap };
