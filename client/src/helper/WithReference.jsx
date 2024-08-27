import { useRef } from "react";

export const withReference = (Component) => {
  const Wrapper = (props) => {
    const reference = useRef();

    return <Component reference={reference} {...props} />;
  };

  return Wrapper;
};
