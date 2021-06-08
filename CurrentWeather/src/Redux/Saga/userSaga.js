import {takeLatest, call, put, all} from 'redux-saga/effects';
import Config from 'react-native-config';

import {FIND_TEMPERATURE_API} from '../../Constants';
import APICaller from '../../Utils/apiCaller';
import ActionTypes from '../ActionConstant';

function* findTemperature(payload) {
  try {
    const lat =  payload.payload.userCoordinates.latitude;
    const lon = payload.payload.userCoordinates.longitude;
    const url = `${FIND_TEMPERATURE_API}lat=${lat}&lon=${lon}&appid=${Config.API_KEY}`;
    const response = yield call(APICaller, 'GET', url, {});
    yield put({
      type: ActionTypes.FIND_TEMPERATURE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.FIND_TEMPERATURE_FAILURE,
      payload: e,
    });
  }
}

export default function* Sagas() {
  yield all([takeLatest(ActionTypes.FIND_TEMPERATURE, findTemperature)]);
}
