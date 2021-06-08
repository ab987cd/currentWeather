import ActionType from '../ActionConstant';

const initialState = {
  loader: false,
  data: {},
  error: {
    hasError: false,
    errorData: {}
  },
};

const homeNotificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.FIND_TEMPERATURE:
      return {
        ...state,
        loader: true,
      };
    case ActionType.FIND_TEMPERATURE_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
        error: {}
      };
    case ActionType.FIND_TEMPERATURE_FAILURE:
      return {
        ...state,
        loader: false,
        data: {},
        error:{hasError: true, errorData: action.payload},
      };
    default:
      return state;
  }
};

export default homeNotificationReducer;
