import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Logo from "../Components/Logo";
import PuppyVideo from "../Components/PuppyVideo";
import useInput from "../Hooks/useInput";

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  min-height: ${props => props.windowHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StateChanger = styled.div`
  width: 300px;
  text-align: center;
  z-index: 100;
`;

const Label = styled.span`
  color: ${props => props.theme.whiteColor};
`;

const Link = styled(Label)`
  margin-left: 10px;
  cursor: pointer;
  color: ${props => props.theme.yellowColor};
  font-weight: 600;
`;

const Form = styled.div`
  width: 100%;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    input {
      width: 100%;
      margin-bottom: 8px;
    }
  }
  margin-bottom: 20px;
`;

const STATE_LOGIN = "logIn";
const STATE_SIGNUP = "signUp";

const LogInComponents = ({ email, password }) => (
  <Form>
    <form>
      <Input type="email" required placeholder="Email Address" {...email} />
      <Input type="password" required placeholder="Password" {...password} />
      <Button
        text="Log In"
        onClick={() => {
          console.log("click");
        }}
      />
    </form>
  </Form>
);

const SignUpComponents = ({ email, password, passwordConfirm, username, firstName, lastName }) => (
  <Form>
    <form>
      <Input type="email" required placeholder="Email Address" {...email} />
      <Input type="password" required placeholder="Password" {...password} />
      <Input type="password" required placeholder="Password Confirm" {...passwordConfirm} />
      <Input required placeholder="User name" {...username} />
      <Input required placeholder="First name" {...firstName} />
      <Input required placeholder="Last name" {...lastName} />
      <Button
        text="Register"
        onClick={() => {
          console.log("click");
        }}
      />
    </form>
  </Form>
);

export default () => {
  const [action, setAction] = useState(STATE_LOGIN);
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  console.log(email, password, passwordConfirm, username, firstName, lastName);

  return (
    <Wrapper windowHeight={window.innerHeight}>
      <Logo />
      <PuppyVideo />
      <StateChanger>
        {action === "logIn" ? (
          <>
            <LogInComponents email={email} password={password} />
            <Label>Don't you have an account?</Label>
            <Link onClick={() => setAction(STATE_SIGNUP)}>Sign Up</Link>
          </>
        ) : (
          <>
            <SignUpComponents
              email={email}
              username={username}
              password={password}
              passwordConfirm={passwordConfirm}
              firstName={firstName}
              lastName={lastName}
            />
            <Label>Have an account?</Label>
            <Link onClick={() => setAction(STATE_LOGIN)}>Log In</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
