import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Container = styled.div``;

const FollowButton = styled(Button)``;

const FollowButtonPresenter = ({ isFollowing, onClick }) => {
  return (
    <Container>
      <FollowButton color="primary" onClick={() => onClick()}>
        {isFollowing ? "Unfollow" : "Follow"}
      </FollowButton>
    </Container>
  );
};

export default FollowButtonPresenter;
