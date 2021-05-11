import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";
import Swal from 'sweetalert2';

const SET_APPLY = "SET_APPLY";
const ADD_APPLY = "ADD_APPLY";
const DELETE_APPLY = "DELETE_APPLY";

const setApply = createAction(SET_APPLY, (applyList) => ({ applyList }));
const addApply = createAction(ADD_APPLY, (apply) => ({ apply }));
const deleteApply = createAction(DELETE_APPLY, (applyId) => ({ applyId }));

const initialState = {
  applyList: [],
}

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

      Swal.fire({
        text: `${res.data.msg}`,
        icon: 'success',
        confirmButtonColor: "#999cda",
      })

    }).catch((err) => {
      console.log("지원하기 에러:", err.response.data.msg);
      Swal.fire({
        text: `${err.response.data.msg}`,
        icon: 'warning',
        confirmButtonColor: "#999cda",
      })
    })
  }
}

const getApplyAPI = (teamId) => {
  return function (dispatch, getState, { history }) {

    if (!teamId) {
      return false;
    }

    axios({
      method: 'get',
      url: `${config.api}/api/apply?team_id=${teamId}`,
    }).then((res) => {

      dispatch(setApply(res.data));

    }).catch((err) => {
      console.log("지원조회 에러:", err);
    })
  }
}

const deleteApplyAPI = (teamId) => {
  return function (dispatch, getState, { history }) {

    if (teamId) {
      return false;
    }

    axios({
      method: 'delete',
      url: `${config.api}/api/apply?team_id=${teamId}`,
    }).then((res) => {

      console.log(res);

    }).catch((err) => {
      console.log("지원삭제 에러:", err);
    })

  }
}

const choiceApplyAPI = (applyId) => {
  return function (dispatch, getState, { history }) {

    axios({
      method: 'put',
      url: `${config.api}/api/apply/choice?apply_id=${applyId}`,
    }).then((res) => {
      console.log(res)
      Swal.fire({
        text: `${res.data.msg}`,
        icon: 'success',
        confirmButtonColor: "#999cda",
      })
      dispatch(setApply(res.data.applicantList));
    }).catch((err) => {
      console.log('리더 지원자 선택 에러:', err);
      Swal.fire({
        text: `${err.response.data.msg}`,
        icon: 'warning',
        confirmButtonColor: "#999cda",
      })
    })

  }
}


export default handleActions({
  [SET_APPLY]: (state, action) => produce(state, (draft) => {
    draft.applyList = action.payload.applyList;
  }),
  [ADD_APPLY]: (state, action) => produce(state, (draft) => {

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