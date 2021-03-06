import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../../elements";
import SmallTalkCommentPost from "./SmallTalkCommentPost";
import { actionCreators as smalltalkActions } from "../../redux/modules/smalltalk";
import DefaultProfile from "../../images/def_profile.svg";

const SmallTalkComment = (props) => {
  const { comments, post_id } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const onChangeComment = useCallback((e) => setComment(e.target.value), []);
  const [comment, setComment] = useState("");
  const addComment = () => {
    dispatch(smalltalkActions.addSmallTalkCommentAPI(comment, post_id));
    setComment("");
  };
  return (
    <CommentWrapper>
      {comments.map((c) => (
        <SmallTalkCommentPost data={c} key={c.commentId} post_id={post_id} />
      ))}

      <CommentWriteArea>
        <WriteTop>
          {user && user.profileImage ? (
            <ProfileImage alt="profile" src={user.profileImage} />
          ) : (
            <ProfileImage alt="profile" src={DefaultProfile} />
          )}
          {user ? (
            <CommentTextArea
              maxLength={300}
              value={comment}
              onChange={onChangeComment}
            />
          ) : (
            <CommentTextArea
              maxLength={300}
              disabled
              placeholder="로그인을 해주세요!"
            />
          )}
        </WriteTop>
        <CommentWriteBottom>
          <Button
            padding="4px 5px"
            size="13px"
            width="60px"
            _onClick={addComment}
            borderRadius="5.2px"
          >
            등록
          </Button>
        </CommentWriteBottom>
      </CommentWriteArea>
    </CommentWrapper>
  );
};

const WriteTop = styled.div`
  width: 100%;
  display: flex;
`;

const CommentWriteBottom = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;

const CommentWriteArea = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const CommentTextArea = styled.textarea`
  border: 1px solid #c9c9d9;
  font-size: 0.875rem;
  width: 100%;
  min-height: 100px;
  resize: none;
  box-sizing: border-box;
  padding: 10px;
  /* z-index: 9999; */
  :focus {
    outline: none;
  }
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin-right: 10px;
  @media (max-width: 375px) {
    width: 30px;
    height: 30px;
  }
`;

const CommentWrapper = styled.div`
  background-color: #f2f5fa;
  min-height: 80px;
  margin: 0 auto;
  padding: 5px 28px 0 24px;
  border-radius: 10px;
  width: 55%;
  position: relative;
  top: 2px;
  @media (max-width: 425px) {
    width: 85%;
    height: auto;
  }
`;

export default SmallTalkComment;
