import { getAirports } from '../Redux/actions';
import axios from 'axios';

function aiportSearch() {
  return (dispatch) => {
    axios.get(window.location.origin  + '/airport.json')
      .then(response => {
        dispatch(getAirports(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
}

export { aiportSearch }