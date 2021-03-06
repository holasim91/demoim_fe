import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";
import { SuccessAlert, ErrorAlert } from "../../shared/Alerts";
import { actionCreators as teamActions } from "../modules/team";
import { actionCreators as userActions } from "../modules/user";
const SET_APPLY = "SET_APPLY";
const ADD_APPLY = "ADD_APPLY";
const DELETE_APPLY = "DELETE_APPLY";

const setApply = createAction(SET_APPLY, (applyList) => ({ applyList }));
// const addApply = createAction(ADD_APPLY, (apply) => ({ apply }));
// const deleteApply = createAction(DELETE_APPLY, (applyId) => ({ applyId }));

const initialState = {
  applyList: [],
}

//팀메이킹 지원하기 
const addApplyAPI = (teamId, msg, site) => {
  return function (dispatch, getState, { history }) {

    if (!teamId) {
      return false;
    }
    axios({
      method: 'post',
      url: `${config.api}/api/apply?team_id=${teamId}`,
      data: {
        message: msg,
        portfolio: site,
      }
    }).then((res) => {
      SuccessAlert(`${res.data.msg}`)
      //applyteamid 세팅을 위해 호출.
      dispatch(userActions.loginCheckAPI());
    }).catch((err) => {
      console.log("지원하기 에러:", err.response.data.msg);
      ErrorAlert(`${err.response.data.msg}`)
    })
  }
}

//팀메이킹 지원목록 조회하기 
const getApplyAPI = (teamId) => {
  return function (dispatch, getState, { history }) {

    if (!teamId) {
      return false;
    }

    axios({
      method: 'get',
      url: `${config.api}/api/apply?team_id=${teamId}`,
    }).then((res) => {
      let waitingMembers = res.data.filter((r) => r.applyState === 'WAITING');
      dispatch(setApply(waitingMembers));

    }).catch((err) => {
      console.log("지원조회 에러:", err);
    })
  }
}

//팀메이킹 지원취소하기 
const deleteApplyAPI = (teamId) => {
  return function (dispatch, getState, { history }) {

    if (!teamId) {
      return false;
    }

    axios({
      method: 'delete',
      url: `${config.api}/api/apply?team_id=${teamId}`,
    }).then((res) => {
      SuccessAlert(`${res.data.msg}`)
      dispatch(teamActions.getUserApplyListAPI());

    }).catch((err) => {
      console.log("지원삭제 에러:", err);
      ErrorAlert(`${err.response.data.msg}`)
    })

  }
}

//팀메이킹 리더 지원자 선택하기
const choiceApplyAPI = (applyId) => {
  return function (dispatch, getState, { history }) {

    axios({
      method: 'put',
      url: `${config.api}/api/apply/choice?apply_id=${applyId}`,
    }).then((res) => {
      console.log(res)
      SuccessAlert(`${res.data.msg}`)

      let waitingMembers = res.data.applicantList.filter((r) => r.applyState === 'WAITING');
      dispatch(setApply(waitingMembers));
    }).catch((err) => {
      console.log('리더 지원자 선택 에러:', err);
      ErrorAlert(`${err.response.data.msg}`)
    })

  }
}


export default handleActions({
  [SET_APPLY]: (state, action) => produce(state, (draft) => {
    draft.applyList = action.payload.applyList;
  }),
  [ADD_APPLY]: (state, action) => produce(state, (draft) => {
    draft.applyList.push(action.payload.apply);
  }),
  [DELETE_APPLY]: (state, action) => produce(state, (draft) => {
    draft.applyList = draft.applyList.filter((a) => a.id !== action.payload.applyId);
  }),
}, initialState);

const actionCreators = {
  getApplyAPI,
  addApplyAPI,
  deleteApplyAPI,
  choiceApplyAPI
};

export { actionCreators };