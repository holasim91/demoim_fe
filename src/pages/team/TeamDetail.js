import React from "react";
import styled, { css } from "styled-components";
import { Container, Image, Input } from "../../elements";
import { Modal, ApplyList } from "../../components";
import { useMediaQuery } from "react-responsive";
import { history } from "../../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as teamActions } from "../../redux/modules/team";
import Leader from '../../images/leader.svg';
import '../../css/editor.css';
//quill css 찾아서 적용해놓기. 가운데 정렬 등등 나오려면 찾아야함. 

import moment from "moment";

const TeamDetail = (props) => {

  const dispatch = useDispatch();
  const id = props.match.params.teamId;
  const team = useSelector((state) => state.team.teamInfo);
  const user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(teamActions.getDetailTeamMakingAPI(id));
  }, []);


  let recruitBegin = moment(team?.createdAt).format('YYYY.MM.DD');
  let recruitEnd = moment(team?.recruit).format('YYYY.MM.DD');
  let projectBegin = moment(team?.begin).format('YYYY.MM.DD');
  let projectEnd = moment(team?.end).format('YYYY.MM.DD');

  //지원하기
  //로그인 여부에 따라 모달창 막기.
  const [msg, setMsg] = React.useState("");
  const [site, setSite] = React.useState("");

  //지원하기 함수.
  const applyTeam = () => {
    if (msg === "" || site === "") {
      return false;
    }
  }

  const isMobile = useMediaQuery({
    query: "(max-width:768px)"
  });

  return (
    <React.Fragment>
      <Container>
        <TitleBox>
          <Title>[프로젝트] {team.title}</Title>
        </TitleBox>
        <ContentBox>
          <LeaderBox>
            <LeaderMent>
              <LeaderIntro>TEAM LEADER</LeaderIntro>
            </LeaderMent>
            <LeaderInnerBox>
              <LeaderContent>
                <ImageBox>
                  <Image shape="circle" size="60" src={team?.leader?.profileImage ? team?.leader?.profileImage : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} />
                  <LeaderIcon src={Leader} />
                </ImageBox>
                <LeaderInfo>
                  {isMobile ? (<React.Fragment>
                    <LeaderInfoText className="nickname">
                      {team?.leader?.nickname}
                    </LeaderInfoText>
                    <LeaderInfoText className="position">
                      <span>
                        {team?.leader?.position}
                      </span>
                    </LeaderInfoText>
                  </React.Fragment>) : (
                    <LeaderInfoTop>
                      <LeaderInfoText className="nickname">
                        {team?.leader?.nickname}
                      </LeaderInfoText>
                      <LeaderInfoText className="position">
                        <span>
                          {team?.leader?.position}
                        </span>
                      </LeaderInfoText>
                    </LeaderInfoTop>)}
                  <LeaderInfoText className='introduce'>
                    {team?.leader?.desc}
                  </LeaderInfoText>
                </LeaderInfo>
              </LeaderContent>
            </LeaderInnerBox>
          </LeaderBox>
          <TeamPostBox>
            <ContentInnerBox>
              <InfoBox>
                <InfoText>
                  <span>모집기간</span> {recruitBegin}-{recruitEnd}
                </InfoText>
                <InfoText>
                  <span>프로젝트 기간</span> {projectBegin}-{projectEnd}
                </InfoText>
                <InfoText>
                  <span>인원</span> {team.front !== 0 && `프론트엔드 ${team.front}명 `}
                  {team.back !== 0 && `백엔드 ${team.back}명 `}
                  {team.designer !== 0 && `디자이너 ${team.designer}명 `}
                  {team.planner !== 0 && `기획자 ${team.planner}명 `}
                </InfoText>
                <InfoText>
                  <span>언어</span> {team.stack}
                </InfoText>
                <InfoText>
                  <span>장소</span> {team.location}
                </InfoText>
              </InfoBox>
              <ProjectCotentsBox dangerouslySetInnerHTML={{ __html: team.contents }} />
            </ContentInnerBox>
          </TeamPostBox>
          <LeaderBtn onClick={() => history.push(`/team/edit/${id}`)}>수정</LeaderBtn>
          {team?.leader?.id === user?.id &&
            (<LeaderMenu>
              {team.recruitState !== "FINISHED" && (
                <LeaderBtn onClick={() => history.push(`/team/edit/${id}`)}>수정</LeaderBtn>
              )}
              <LeaderBtn onClick={() => dispatch(teamActions.deleteTeamMakingAPI(team.teamId))}>삭제</LeaderBtn>
            </LeaderMenu>)}
        </ContentBox>
        <ModalBox>
          {team?.leader?.id !== user?.id || user === null ? (
            team.recruitState === "ACTIVATED" ?
              (<Modal text="지원하기" padding="5px 16px" heading="📢 지원서 보내기" clickName="지원신청" _onClick={applyTeam}>
                <ApplyBox>
                  <Input multiLine label="메세지" placeholder="리더에게 연락처 및 메세지를 남겨주세요(100자 이내)" modal margin="0px 0px 10px 0px" value={msg} _onChange={(e) => { setMsg(e.target.value) }} />
                  <Input label="포트폴리오" placeholder="포트폴리오 참고 사이트를 입력해주세요 :)" padding="10px 10px" modal value={site} _onChange={(e) => { setSite(e.target.value) }} type="url" />
                </ApplyBox>
              </Modal>) : (
                <RecruitFinishBtn>모집완료</RecruitFinishBtn>
              )
          ) : ('')}
        </ModalBox>

        <ApplyList />

      </Container>
    </React.Fragment>
  )
}

export default TeamDetail;

const Flex = css`
  display: flex;
  flex-direction: column;
`;

//모집글
const TitleBox = styled.div`
  margin-top:70px;
  padding-left:40px;
  
  @media ${props => props.theme.mobile}{
    padding: 0px 0px 0px 20px;
    
  }
`;

const ContentBox = styled.div`
  width:90%;
  box-sizing: border-box;
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //gap:7%;
  margin:35px auto 0px auto;
  //align-items: center; //이거빼면 내용,리더박스 위로 정렬.
  
 
  @media ${props => props.theme.mobile}{
    min-height: auto;
    padding:0px;
    margin-bottom: 15px;
    margin-top:0px;
  }
  
`;

const TeamPostBox = styled.div`
  width:100%;
  ${Flex}

  @media ${props => props.theme.tablet}{
    width:100%;
  }
`;

const ContentInnerBox = styled.div`
  background-color: ${props => props.theme.main_gray};
  box-sizing:border-box;
  padding:20px;
   border-radius: 2px;

`;

const LeaderIcon = styled.img`
  position: absolute;
  top:-8px;
  left:25px;
`;

const InfoBox = styled.div`
  width:100%;
  ${Flex}
  box-sizing: border-box;
  gap:10px;
  background-color: #ffffff;
  padding:15px;
`;

const InfoText = styled.p`
  font-size:15px;
  line-height: 1.4em;

  & span{
    background-color:#e5ecf7;
    padding:2px 10px;
    font-size:0.8em;
    border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.27);
    margin-right: 5px;
    font-weight: 600;
  }

  @media (max-width:420px){
      font-size:12px;
  }

`
const Title = styled.p`
  font-size:21px;
  line-height: 1.4em;
  font-weight: 600;
  padding-left:10px;
  @media ${props => props.theme.mobile}{
    font-size:18px;
    padding-left:10px;
  }

  @media (max-width:420px){
      font-size:16px;
      padding-left:0px;
  }
`;

const ProjectCotentsBox = styled.div`
  box-sizing:border-box;
  padding-top:15px;
  min-height: 150px;
  

  & img{
    width:70%;
  }
  & p{
    line-height: 1.3em;
  }
  & h1,h2,h3{
    line-height: 1.5em;
  }
  @media (max-width:420px){
  
    & p,ol,ul{
      font-size:0.9em;
      line-height: 1.3em;
    }
  }
`;


//리더 프로필 
const LeaderBox = styled.div`
  width:60%;
  margin-bottom: 40px;
  @media ${props => props.theme.tablet}{
    
    width:75%;
  }
  @media ${props => props.theme.mobile}{
    width:100%;
    padding-top:20px;
    border:none;
    margin-bottom: 20px;
  }
`;

const LeaderContent = styled.div`
  display: flex;
  gap:20px;
  justify-content: flex-start;
  align-items: center;

   @media ${props => props.theme.mobile}{
    flex-direction:column;
    gap:10px;
  }
`;

const LeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeaderInfoText = styled.p`
  font-size:16px;

  &.introduce{
    line-height: 1.4em;
    font-size:0.85em;
    margin-top:10px;
  }

  &.position{
    font-size:0.7em;
  & span{
      background-color: ${props => props.theme.button_purple};
      padding:2px 8px;
      border-radius: 12px;
      color:#ffffff;
      position: relative;
      top:3px;
      left:7px;
    }
  }

  &.nickname{
    font-size:17px;
    font-weight: 600;
    cursor: pointer;
  }

  @media ${props => props.theme.mobile}{
    
    font-size:15px;
    
    &.introduce{
      padding:0px;
      margin-top:20px;
    }
    &.nickname{
    font-size:1em;
    text-align: center;
  }

  &.position{
    font-size:0.8em;
    text-align: center;

    & span{
      background-color: ${props => props.theme.button_purple};
      padding:0px 8px;
      border-radius: 12px;
      color:#ffffff;
      top:5px;
      left:0px;
    }
  }
  }
`;

const ImageBox = styled.div`
  position: relative;
`;
const LeaderInnerBox = styled.div`
  box-sizing: border-box;
  padding:15px 0px 15px 30px;
  border-radius:5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;

  @media ${props => props.theme.mobile}{
    border:none;
    min-height: auto;
    padding:25px 15px 25px 15px;
  }
  
`;

const LeaderMent = styled.div`
  font-size:1.1em;
  font-weight: 600;
  text-align:center;
  margin-bottom: 15px;

  @media ${props => props.theme.mobile}{
    margin:20px 0px 15px 0px;
  }

`;

const LeaderIntro = styled.span`
  background-color: white;
  font-size:17px;
  padding:0px 10px;
  position: relative;
  z-index:3;
`;

const LeaderInfoTop = styled.div`
  display: flex;

`;

const LeaderMenu = styled.div`
display: flex;
justify-content: flex-end;
width:100%;
gap:7px;
margin-top:15px;
padding-right: 20px;

@media ${props => props.theme.mobile}{
  padding-right: 10px;
}

`;


const LeaderBtn = styled.button`
  padding:3px 15px;
  outline: none;
  cursor: pointer;
  border: 2px solid rgba(122,119,134,0.5);
  border-radius: 8px;
  background-color:#ffffff;
  font-weight: 600;

  @media ${props => props.theme.mobile}{
    font-size:0.8em;
  }

`;

//모달
const ModalBox = styled.div`
  width:100%;
  text-align: center;
  margin:30px 0px 50px 0px;

  @media ${props => props.theme.mobile}{
    margin: 40px 0px 50px 0px;
  }
`;

const ApplyBox = styled.div`
  width:95%;
  margin:0px auto;
`;

const RecruitFinishBtn = styled.button`
  border:2px solid #979797;
  background-color: #979797;
  color:#ffffff;
  outline: none;
  border-radius: 12px;
  font-size: 1em;
  padding:5px 16px;

    @media ${props => props.theme.mobile}{
      font-size:0.85em;
    }
`;