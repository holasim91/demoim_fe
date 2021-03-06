import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as exhibitionCommentActions } from "../../redux/modules/exhibitionComment";
import DefaultProfile from "../../images/def_profile.svg";

const ExhibitionCommentWrite = (props) => {
  const dispatch = useDispatch();
  const { post_id } = props;
  const { user, isLogin } = useSelector((state) => state.user);
  const [contents, setContents] = useState("");

  const onChangeTextArea = useCallback((e) => {
    setContents(e.target.value);
  },[]);
  const onSubmitExhibitionComment = useCallback(() => {
    dispatch(
      exhibitionCommentActions.addExhibitionCommentsAPI(post_id, contents)
    );
    setContents("");
  },[dispatch, post_id, contents]);

  return (
    <WriteWrapper>
      <WriteTop>
        {user?.profileImage ? (
          <ProfileImage alt="profile" src={user.profileImage} />
        ) : (
          <ProfileImage alt="profile" src={DefaultProfile} />
        )}
        {isLogin ? (
          <TextArea
            maxLength="300"
            placeholder="댓글을 작성해 주세요!!"
            value={contents}
            onChange={onChangeTextArea}
          />
        ) : (
          <TextArea maxLength="300" placeholder="로그인 해주세요!" disabled />
        )}
      </WriteTop>
      <WriteBottom>
        {isLogin ? (
          <Button
            padding="4px 5px"
            size="13px"
            width="60px"
            bg="
            #999cda"
            _onClick={onSubmitExhibitionComment}
            borderRadius="5.2px"
            margin="0px 5px 0px 0px"
          >
            등록
          </Button>
        ) : (
          ""
        )}{" "}
      </WriteBottom>
    </WriteWrapper>
  );
};

const WriteTop = styled.div`
  width: 100%;
  display: flex;
`;
const WriteBottom = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
`;
const WriteWrapper = styled.div`
  min-height: 160px;
  margin: 80px auto 0 auto;
  padding: 17px 28px 0 24px;
  width: 80%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.07);
  background-color: #fff;
  border-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    margin: 20px auto 0 auto;

  }

`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin-right: 10px;
`;
const TextArea = styled.textarea`
  border: 1px solid #c9c9d9;
  font-size: 0.875rem;
  width: 100%;
  min-height: 100px;
  resize: none;
  :focus {
    outline: none;
  }
  box-sizing: border-box;
  padding:10px;
`;
export default ExhibitionCommentWrite;
