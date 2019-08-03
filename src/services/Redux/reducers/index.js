import { combineReducers } from 'redux';
import fetchAPI from '../reducers/fetchAPI';


const allReducers = combineReducers({
  fetchAPI
});
export default allReducers;