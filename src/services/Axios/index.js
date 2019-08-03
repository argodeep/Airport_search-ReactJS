import { getAirports } from '../Redux/actions';
import axios from 'axios';

function aiportSearch() {
    return (dispatch) => {
      axios.get('https://argodeep.github.io/React-Redux-Hooks-with-axios-redux-thunk/master/public/airport.json')
        .then(response => {
          dispatch(getAirports(response.data))
        })
        .catch(error => {
            throw(error);
        });
    };
}

export { aiportSearch }