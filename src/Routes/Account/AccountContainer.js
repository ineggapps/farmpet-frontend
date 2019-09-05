import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ME } from "../../SharedQueries";
import { useQuery, useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import AccountPresenter from "./AccountPresenter";
import { UPDATE_ACCOUNT } from "./AccountQueries";

const AccountContainer = withRouter(({ history }) => {
  const {
    location: { pathname }
  } = history;
  const { data: meData, loading: meLoading } = useQuery(ME);
  const [updateAccountMutation] = useMutation(UPDATE_ACCOUNT);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");
  const [avatar, setAvatar] = useState("");
  const onSubmit = async () => {
    //회원정보 변경 전송 시
    const data = {};
    if (username) Object.assign(data, { username: username.value });
    if (firstName) Object.assign(data, { firstName: firstName.value });
    if (lastName) Object.assign(data, { lastName: lastName.value });
    if (bio) Object.assign(data, { bio: bio.value });
    if (avatar) Object.assign(data, { avatar: avatar.value });
    const result = await updateAccountMutation({ variables: { ...data } });
    console.log("결괏값: ", result);
  };

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
      onSubmit={onSubmit}
    />
  );
});

AccountContainer.propTypes = {};

export default AccountContainer;
