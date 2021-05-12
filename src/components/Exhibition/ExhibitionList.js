import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExhibitionPost from "./ExhibitionPost";
import { actionCreators as exhibitionActions } from "../../redux/modules/exhibition";
import Spinner from "../../shared/Spinner";
import { history } from "../../redux/configStore";
import styled from "styled-components";
import { Button } from "../../elements";

const ExhibitionList = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); //현재페이지, 1부터 시작
  useEffect(() => {
    dispatch(exhibitionActions.getExihibitionAPI(page, 6));
  }, [dispatch, page]);
  const { exhibitionPosts, exihibitionLoading } = useSelector(
    (state) => state.exhibition
  );
  if(!exhibitionPosts){
    return(
      <>Nodata</>
    )
  }
  if (exihibitionLoading && history.location.pathname !== "/") {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      {history.location.pathname === "/exhibition" && (
        <TopBox>
          <BtnBox>
            <Button padding="7px 5px" size="15px" _onClick={()=>history.push('/exhibition/write')}>
              글쓰기
            </Button>
          </BtnBox>
        </TopBox>
      )}

      <ExhibitionBoxWrapper>
        {exhibitionPosts.map((post) => (
          <ExhibitionPost
            data={post}
            key={post.exhibitionId}
            onClick={() => history.push(`/detail/${post.exhibitionId}`)}
          />
        ))}
      </ExhibitionBoxWrapper>
    </>
  );
};

const TopBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 50px;
  margin: 80px 0px 40px 0px;
  flex-wrap: wrap;
`;
const BtnBox = styled.div`
  width: 100px;
`;

const ExhibitionBoxWrapper = styled.div`
  margin: 30px auto 30px auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2%;
  grid-row-gap: 27px;

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0%;
  }
`;

export default ExhibitionList;
