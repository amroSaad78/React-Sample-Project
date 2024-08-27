import { useDispatch } from "react-redux";

export const withDispatch = (Component) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch();

    return <Component dispatch={dispatch} {...props} />;
  };

  return Wrapper;
};
