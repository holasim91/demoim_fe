import React from "react";
import styled from "styled-components";
import { Image } from "../elements";
import AlarmProfile from "../images/demoim.png";
import { IoCloseOutline } from "react-icons/io5";

const AlarmCard = () => {
  return (
    <Wrapper>
      <DeleteOneAlarm />
      <ImageBox>
        <Image src={AlarmProfile} size="50" shape="circle" shadow />
      </ImageBox>
      <ContentsBox>
        <p className="date">2021.04.05 12:33</p>
        <p className="ment">꿀꿀님이 회원님의 프로젝트 자랑글에 댓글을 달았습니다.</p>
      </ContentsBox>
    </Wrapper>
  )
}

export default AlarmCard;

const Wrapper = styled.div`
  width:100%;
  min-height: 110px;
  box-sizing: border-box;
  padding:12px;
  background-color: #f2f5fa;
  display: flex;
  align-items: center;
  position: relative;
`;

const ImageBox = styled.div`
  margin:0px 20px;

  @media ${props => props.theme.mobile}{
    margin: 0px 10px 0px 0px;
    }

`;

const ContentsBox = styled.div`
  line-height: 1.5em;

  & .date{
    font-size:15px;
    color:#7a7786;
  }

  & .ment{
    font-weight: 500;
  }
  @media ${props => props.theme.mobile}{
    
    & .date{
      font-size:0.8em;
    }
    & .ment{
      font-size:0.87em;
    }
  }
`;

const DeleteOneAlarm = styled(IoCloseOutline)`
  cursor: pointer;
  font-size:25px;
  position: absolute;
  top:10px;
  right:10px;

  @media ${props => props.theme.mobile}{
    font-size:21px;
  }
`;