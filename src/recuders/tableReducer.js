import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,
} from '../constants/dataConstants';

export const tableReducer = (
  state = { loading: true, datalist: [] },
  action
) => {
  switch (action.type) {
    case DATA_REQUEST:
      return { loading: true };
    case DATA_SUCCESS:
      return { loading: false, datalist: action.payload };
    case DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
