import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as smalltalkActions } from "../../redux/modules/smalltalk";
import { calcTime } from "../../shared/Common";
import DefaultProfile from "../../images/def_profile.svg";
import { history } from "../../redux/configStore";
import { WarningAlert } from "../../shared/Alerts";

const SmallTalkCommentPost = (props) => {
  const dispatch = useDispatch();
  const { post_id } = props;
  const { comments, user, createdAt, commentId } = props.data;
  const { isLogin } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false); // 수정 모드 토글
  const [current, setCurrent] = useState(comments);
  const onUpdateTextArea = (e) => {
    setCurrent(e.target.value);
  };

  const onClickCommentUpdate = () => {
    setIsEdit((state) => !state);
  };
  const onUpdateComment = () => {
    dispatch(
      smalltalkActions.updateSmallTalkCommentAPI(post_id, commentId, current)
    );
    setIsEdit(false);
  };

  const onClickDeleteComment = () => {
    dispatch(smalltalkActions.deleteSmallTalkCommentAPI(post_id, commentId));
  };
  const currentUser = useSelector((state) => state.user);
  const setLineBreak = (comment) => comment.split("₩n").map((line) => line);
  return (
    <>
      <CommentHeader>
        <HeaderLeft>
          <ProfileImage
            alt="profile"
            src={user.profileImage ? user.profileImage : DefaultProfile}
          />
          <UserName
            onClick={() => {
              isLogin
                ? history.push(`/userpage/${user?.userId}`)
                : WarningAlert("더 자세한 정보는 로그인 후 확인 가능합니다😍")
            }}
          >
            {user.nickname}
          </UserName>
        </HeaderLeft>
        <HeaderRight>
          <PostDate>{calcTime(createdAt)}</PostDate>
        </HeaderRight>
      </CommentHeader>
      {isEdit ? (
        <UpdateTextArea
          value={current}
          onChange={onUpdateTextArea}
          maxLength="300"
        />
      ) : (
        // <PostContents>{comments}</PostContents>
        <PostContents>{setLineBreak(comments)}</PostContents>
      )}
      {isEdit ? (
        <UpdatePostBoxBottom>
          <div className="updateCancel" onClick={onClickCommentUpdate}>
            취소
          </div>
          <div className="updatePost" onClick={onUpdateComment}>
            수정하기
          </div>
        </UpdatePostBoxBottom>
      ) : (
        <PostBoxBottom>
          {currentUser.isLogin && currentUser.user.id === user.userId ? (
            <EditToggle>
              <div className="editPost" onClick={onClickCommentUpdate}>
                수정하기
              </div>
              <div className="deletePost" onClick={onClickDeleteComment}>
                삭제
              </div>
            </EditToggle>
          ) : (
            ""
          )}
        </PostBoxBottom>
      )}
    </>
  );
};

const UpdatePostBoxBottom = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 13px;
  .updateCancel {
    padding-left: 20px;
    cursor: pointer;
    :hover {
      color: #ccc;
    }
  }
  .updatePost {
    cursor: pointer;
    :hover {
      color: #ccc;
    }
  }
  @media (max-width: 375px) {
    font-size: 11px;
  }
`;

const UpdateTextArea = styled.textarea`
  border: 1px solid #c9c9d9;
  font-size: 0.875rem;
  width: 100%;
  min-height: 60px;
  resize: none;
  :focus {
    outline: none;
  }
`;

const EditToggle = styled.div`
  display: flex;
  .editPost {
    padding-right: 40px;
    cursor: pointer;
    :hover {
      color: #ccc;
    }
  }
  .deletePost {
    cursor: pointer;
    :hover {
      color: #ccc;
    }
  }
`;

const PostBoxBottom = styled.div`
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  flex-flow: row-reverse;
  font-size: 13px;
  @media (max-width: 375px) {
    font-size: 11px;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  @media (max-width: 375px) {
    width: 30px;
    height: 30px;
  }
`;
const UserName = styled.div`
  padding-left: 10px;
  cursor: pointer;
  @media (max-width: 375px) {
    font-size: 13px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostDate = styled.div`
  color: #7a7786;
  font-size: 13px;
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 375px) {
    font-size: 13px;
  }
`;
const PostContents = styled.div`
  margin-top: 10px;
  min-height: 50px;
  padding-left: 65px;
  font-size: 14px;
  @media (max-width: 375px) {
    font-size: 12px;
    padding-left: 45px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
`;

export default SmallTalkCommentPost;
