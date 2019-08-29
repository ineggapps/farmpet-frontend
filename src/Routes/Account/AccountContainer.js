import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ME } from "../../SharedQueries";
import { useQuery } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import AccountPresenter from "./AccountPresenter";

const AccountContainer = withRouter(({ history }) => {
  const {
    location: { pathname }
  } = history;
  const { data: meData, loading: meLoading } = useQuery(ME);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (meData && meData.me) {
      username.setValue(meData.me.username);
      firstName.setValue(meData.me.firstName);
      lastName.setValue(meData.me.lastName);
      bio.setValue(meData.me.bio);
      setAvatar(meData.me.avatar);
      console.log(avatar);
    }
  }, [meData]);

  return (
    <AccountPresenter
      meData={meData}
      meLoading={meLoading}
      pathname={pathname}
      username={username}
      firstName={firstName}
      lastName={lastName}
      bio={bio}
      avatar={avatar}
      setAvatar={setAvatar}
    />
  );
});

AccountContainer.propTypes = {};

export default AccountContainer;
