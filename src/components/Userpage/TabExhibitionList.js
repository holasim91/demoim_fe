/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from "react-redux"
import ExhibitionList from "../Exhibition/ExhibitionList";
import { actionCreators as userAction} from "../../redux/modules/user";


const TabExhibitionList = (props) => {
  const dispatch = useDispatch();

  //userpage에서 props 가져오기
  const { is_me, otherId} = props;

  React.useEffect(() => {
    if(is_me){
      dispatch(userAction.TabExhibitionAPI());
    }else{
      dispatch(userAction.TabExhibitionAPI(otherId));
    }
  },[otherId]);
  

  return (
    <React.Fragment>
      <ExhibitionList/>
    </React.Fragment>
  );
};

export default TabExhibitionList;