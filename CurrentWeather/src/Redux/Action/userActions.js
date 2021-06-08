import ActionTypes from '../ActionConstant';

export const findtemperature = (payload) => ({
  type: ActionTypes.FIND_TEMPERATURE,
  payload,
});
