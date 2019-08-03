import { getAirports } from '../Redux/actions';
import axios from 'axios';

function aiportSearch() {
    return (dispatch) => {
      axios.get('https://res.cloudinary.com/dfxnlms6d/raw/upload/v1564822945/airport_tcsji6.json')
        .then(response => {
          dispatch(getAirports(response.data))
        })
        .catch(error => {
            let data = []
            dispatch(getAirports(data))
        });
    };
}

export { aiportSearch }