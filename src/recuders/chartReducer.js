import {
  CHART_DATA_REQUEST,
  CHART_DATA_SUCCESS,
  CHART_DATA_FAIL,
} from '../constants/dataConstants';

export const chartReducer = (
  state = { loading: true, CloseArr: [], DateArr: [] },
  action
) => {
  switch (action.type) {
    case CHART_DATA_REQUEST:
      return { loading: true };
    case CHART_DATA_SUCCESS:
      return {
        loading: false,
        CloseArr: action.CloseArr,
        DateArr: action.DateArr,
      };
    case CHART_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
