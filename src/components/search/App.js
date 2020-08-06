import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'throttle-debounce';

import * as API from '../../services/Axios';
import './App.css';

function App() {
  const [airports, setAirports] = useState([]);
  const [airport, setAirport] = useState({});
  const [resultAvailable, setResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const results = useSelector(state => state.fetchAPI);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!results.data) {
      fetch();
    } else {
      if (results.data.length > 0) {
        fetched();
      }
    }
    if (airport.city !== undefined) {
      changeTitle();
    }
  });

  let fetch = () => {
    dispatch(API.aiportSearch());
  }
  let fetched = () => {
    setLoading(false);
  }
  let changeTitle = () => {
    document.title = `Searched Airport - ${airport.airport}`;
  }
  let searchAirports = debounce(500, (input) => {
    setSelected(false);
    let data = [...results.data];
    if (input.length > 1) {
      setAirports(data.filter(e => e.airport.toLowerCase().includes(input.toLowerCase()) || e.city.toLowerCase().includes(input.toLowerCase()) || e.iata.toLowerCase().includes(input.toLowerCase())));
      setResult(true);
    } else if (input.length === 1) {
      setAirports(data.filter(e => e.airport.charAt(0).toLowerCase() === input.toLowerCase() || e.city.charAt(0).toLowerCase() === input.toLowerCase() || e.iata.charAt(0).toLowerCase() === input.toLowerCase()));
      setResult(true);
    } else if (input.length === 0) {
      setAirports([]);
      setResult(false);
      setSelected(false);
    }
  });
  let handleInput = (e) => {
    let input = e.target.value.trim().toLowerCase();
    searchAirports(input);
  }
  let selectAirport = (item) => {
    setSelected(true);
    setResult(false);
    setAirport({
      airport: item.airport,
      city: item.city,
      iata: item.iata
    });
  }

  return (
    <div style={{ outline: 'none', border: 0 }}>
      {loading === false &&
        <div style={{ outline: 'none', border: 0 }}>
          <div style={{ width: '100%', display: 'block' }}>
            <input
              type="text"
              placeholder="Enter Airport Name, Code or City Name"
              className="Search"
              // value={keyword}
              onChange={e => handleInput(e)} />
          </div>
          <div className="Gap"></div>

          <h5 style={{ marginTop: 10, marginBottom: 10, fontSize: 15, color: '#f0ad4e', textAlign: 'center' }}>
            {resultAvailable === true && "Search Results"}
            {selected === true && "Selected Airport"}
          </h5>
          {selected === true &&
            <div className="Results">
              <div style={{ marginTop: 0, padding: 10 }} onClick={() => setSelected(true)}>
                <div style={{ width: '100%', display: 'block' }}>
                  <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                  <span style={{ float: 'right' }}>{airport.iata}</span>
                </div>
                <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777', borderBottom: '0.5px solid #9997' }}>{airport.airport}</p>
              </div>
            </div>
          }
          {selected === false && resultAvailable === true && airports.map((item, i) => (
            <div className="Results" key={i}>
              <div style={{ marginTop: 0, padding: 10 }} id="Select" onClick={() => selectAirport(item)}>
                <div style={{ width: '100%', display: 'block' }}>
                  <span style={{ fontWeight: 'bold' }}>{item.city}</span>
                  <span style={{ float: 'right' }}>{item.iata}</span>
                </div>
                <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777', borderBottom: '0.5px solid #9997' }}>{item.airport}</p>
              </div>
            </div>
          ))
          }
          {
            selected === false && resultAvailable === true && airports.length === 0 &&
            <p style={{ textAlign: 'center' }}>No Result Found</p>
          }
        </div>
      }
    </div>
  );
}

export default App;
