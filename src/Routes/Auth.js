import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  width: 300px;
  min-height: 410px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  margin-left: 10px;
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const STATE_LOGIN = "logIn";
const STATE_SIGNUP = "signUp";

export default () => {
  const [action, setAction] = useState(STATE_LOGIN);

  return (
    <Wrapper>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't you have an account?
            <Link onClick={() => setAction(STATE_SIGNUP)}>Sign Up</Link>
          </>
        ) : (
          <>
            Have an account?
            <Link onClick={() => setAction(STATE_LOGIN)}>Log In</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
