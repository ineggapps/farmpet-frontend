import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea/lib";
import Post from "../Post";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Select, MenuItem } from "@material-ui/core";
import { PERMISSION_PUBLIC, PERMISSION_FRIENDS, PERMISSION_PRIVATE } from "../../SharedQueries";
import PetAvatar from "../PetAvatar";
import PhotoUploadSortable from "../PhotoUploadSortable";
import { flexbox } from "@material-ui/system";

//Material Styles
const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ButtonTest = styled(Button)`
  background-color: blue;
`;

//styled
const Container = styled.div`
  ${props => props.theme.postBox};
  padding: 40px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: 0 none;
  resize: none;
  font-family: ${props => props.theme.fontFamily};
  font-size: 1em;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const Photos = styled.div`
  color: ${props => props.theme.darkGreyColor};
  margin: 20px 0;
`;

const Pets = styled.ul`
  display: flex;
  flex-direction: row-reverse;
`;

const Pet = styled.li`
  position: relative;
  ${props => (props.selected === "selected" ? "opacity:1;" : "opacity:.4")}
  &:hover {
    opacity: 0.8;
  }
  &:not(:last-child) {
    margin-left: 5px;
  }
  & span {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 40px;
    background-color: skyblue;
    display: none;
    font-size: 0.75em;
    letter-spacing: -0.8px;
  }
  &:hover span {
    display: inline-block;
  }
`;

const PermissionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ControlPanel = styled.div`
  margin-top: 20px;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-end;
  align-items: center;
`;

export default ({
  permission,
  setPermission,
  open,
  setOpen,
  selectedPets,
  setSelectedPets,
  onSelected,
  uploadPostMutation,
  captionWriting,
  uploadPost,
  selfPosts,
  onImageUploaded,
  photoUploaderRefresher,
  onUploadStart,
  onUploadEnd
}) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <PermissionContainer>
          <Select
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={permission}
            onChange={({ target: { value } }) => setPermission(value)}
            inputProps={{
              name: "permission",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value={`${PERMISSION_PUBLIC}`}>Public</MenuItem>
            <MenuItem value={`${PERMISSION_FRIENDS}`}>Friends</MenuItem>
            <MenuItem value={`${PERMISSION_PRIVATE}`}>Private</MenuItem>
          </Select>
        </PermissionContainer>
        <form autoComplete="off" className={classes.formControl}>
          <TextArea
            placeholder={`Tell me your story.`}
            value={captionWriting.value}
            onChange={captionWriting.onChange}
          />
          <Photos>
            {photoUploaderRefresher && (
              <PhotoUploadSortable
                onUploadStart={onUploadStart}
                onUploadEnd={onUploadEnd}
                onImageUploaded={onImageUploaded}
              />
            )}
          </Photos>
          <Pets>
            {selectedPets &&
              selectedPets.map(pet => (
                <Pet
                  key={pet.id}
                  onClick={() => onSelected(pet.id)}
                  selected={pet.selected ? "selected" : ""}
                >
                  <PetAvatar category={pet.category} url={pet.avatar} size="md" />
                  <span>{pet.name}</span>
                </Pet>
              ))}
          </Pets>
          <ControlPanel>
            <ButtonTest variant="contained" color="secondary" onClick={() => uploadPost()}>
              Upload
            </ButtonTest>
          </ControlPanel>
        </form>
      </Container>
      {selfPosts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          user={post.user}
          pets={post.pets}
          files={post.files}
          caption={post.caption}
          likeCount={post.likeCount}
          isLiked={post.isLiked}
          permission={post.permission}
          commentCount={post.commentCount}
          comments={post.comments}
          createdAt={post.createdAt}
          newComment={post.newComment}
          toggleLike={post.toggleLike}
          setIsLiked={post.setIsLiked}
          onKeyPress={post.onKeyPress}
          selfComments={post.selfComments}
          me={post.me}
        />
      ))}
    </>
  );
};

//https://material-ui.com/components/buttons/
