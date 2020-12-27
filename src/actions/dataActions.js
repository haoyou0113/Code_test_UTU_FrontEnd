import Axios from 'axios';
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,
} from '../constants/dataConstants';

export const getDataList = (date) => async (dispatch) => {
  dispatch({
    type: DATA_REQUEST,
  });

  try {
    const { data } = await Axios.get(`/api/data/${date}`);
    const datalist = data.map((i, index) => ({
      key: index + i.currency,
      index: index,
      currency: i.currency,
      hours: i.hours || i.hours === 0 ? i.hours.toFixed(1) + '%' : 'No Data',
      days: i.days || i.days === 0 ? i.days.toFixed(1) + '%' : 'No Data',
      months:
        i.months || i.months === 0 ? i.months.toFixed(1) + '%' : 'No Data',
      Volume: '$' + i.Volume,
      MktCap: '$' + i.MktCap,
    }));
    dispatch({ type: DATA_SUCCESS, payload: datalist });
  } catch (err) {
    dispatch({ type: DATA_FAIL, payload: err.message });
  }
};
