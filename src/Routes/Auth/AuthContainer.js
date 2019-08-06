import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

export const STATE_LOGIN = "logIn";
export const STATE_SIGNUP = "signUp";

export default () => {
  const [action, setAction] = useState(STATE_LOGIN);
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const [confirmAccount] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  const onLogin = e => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      console.log(confirmAccount());
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      username={username}
      firstName={firstName}
      lastName={lastName}
      onLogin={onLogin}
    />
  );
};
