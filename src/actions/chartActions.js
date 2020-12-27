import Axios from 'axios';
import moment from 'moment';
import {
  CHART_DATA_REQUEST,
  CHART_DATA_SUCCESS,
  CHART_DATA_FAIL,
} from '../constants/dataConstants';

export const getChartData = (currency, date) => async (dispatch) => {
  dispatch({
    type: CHART_DATA_REQUEST,
  });

  try {
    const { data } = await Axios.get(`api/data/chart/${currency}&${date}`);

    const CloseArr = data.map((i) => i.Close).reverse();
    const DateArr = data
      .map((i) => moment(i.Date).format('YYYY/MM/DD'))
      .reverse();
    dispatch({
      type: CHART_DATA_SUCCESS,
      CloseArr: CloseArr,
      DateArr: DateArr,
    });
  } catch (err) {
    dispatch({ type: CHART_DATA_FAIL, payload: err.message });
  }
};
