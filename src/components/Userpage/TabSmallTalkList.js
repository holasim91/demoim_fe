/* eslint-disable react-hooks/exhaustive-deps */
import React  from 'react';
import { useDispatch } from "react-redux"
import { actionCreators as userAction } from "../../redux/modules/user";
import MySmallTalkList from "../SmallTalk/MySmallTalkList";


const TabSmallTalkList = (props) => {
  const dispatch = useDispatch();

  //userpage에서 props를 가져오기
  const { is_me, otherId } = props;

  React.useEffect(() => {
    if (is_me === true){
      dispatch(userAction.TabSmallTalkAPI()); 
    } else {
      dispatch(userAction.TabSmallTalkAPI(otherId));
    }

  }, [otherId]);


  return (
    <React.Fragment>
      <MySmallTalkList />
    </React.Fragment>
  );
};

export default TabSmallTalkList;