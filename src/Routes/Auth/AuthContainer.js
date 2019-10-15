import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";
import { isDebugging } from "../../GlobalVariables";

export const STATE_LOGIN = "logIn";
export const STATE_SIGNUP = "signUp";

export default () => {
  const [action, setAction] = useState(STATE_LOGIN);
  const email = useInput(isDebugging ? "inegg.apps@gmail.com" : "test@test.com");
  const password = useInput(isDebugging ? "1234" : "test@test.com");
  const passwordConfirm = useInput("");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const [confirmAccountMutation] = useMutation(LOG_IN, {
    // update: (_, { data }) => {
    //   const { confirmAccountMutation } = data;
    //   toast.success(confirmAccountMutation);
    //   console.log(confirmAccountMutation);
    // },
    variables: { email: email.value, password: password.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    // update: (_, { data }) => {
    //   setAction(STATE_LOGIN);
    // },
    variables: {
      email: email.value,
      password: password.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN, {});

  const onSubmit = async e => {
    e.preventDefault();
    if (action === STATE_LOGIN) {
      if (email.value !== "" && password.value !== "") {
        try {
          const result = await confirmAccountMutation();
          const {
            data: { confirmAccount: token }
          } = result;
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          }
        } catch (error) {
          console.log(error, "오류");
          toast.error("The email address or password you entered were invalid.");
        }
      }
    } else if (action === STATE_SIGNUP) {
      if (password.value !== passwordConfirm.value) {
        toast.error("Please check your password and password confirm. They weren't same.");
      } else if (
        email.value !== "" &&
        password.value !== "" &&
        passwordConfirm.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          await createAccountMutation();
          setAction(STATE_LOGIN);
        } catch (error) {
          console.log(error);
          toast.error("Can't create account. try again.");
        }
      } else {
        toast.error("Please fill out all of them.");
      }
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
      onSubmit={onSubmit}
    />
  );
};
