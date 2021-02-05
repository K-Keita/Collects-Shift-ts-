import React, { FC, ReactNode, useEffect } from "react";
import { getIsSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const Auth: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  return <>{isSignedIn ? children : <></>}</>;
};

export default Auth;
