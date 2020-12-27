import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { tableReducer } from './recuders/tableReducer.js';
import { chartReducer } from './recuders/chartReducer.js';
import thunk from 'redux-thunk';

const initialState = {
  datalist: [],
  chartData: [],
};
const reducer = combineReducers({
  tableData: tableReducer,
  chartData: chartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
