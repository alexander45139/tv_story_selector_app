import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";

function App() {
  const [allSeries, setAllSeries] : Series[] = useState([]);

  fetch(`https://am2012.brighton.domains/tv_story_selector/getAllSeries`, {method: 'GET'})
      .then(response => response.json().then(results => {
          setAllSeries(results.series);
      }))
      .catch((err) => console.log(err));

  const addToSeries = async (show) => {
      const newAllSeries = allSeries;

      if (allSeries.filter(se => se.getApiId() === show.getApiId()) < 1) {
          newAllSeries.push(show);
          setAllSeries(newAllSeries);

          show.postSeries();
          show.postStories();
      } else {
          alert(`This series has already been added`);
      }
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>TV Story Selector</h1>

          <SearchBar selectSeries={(s) => addToSeries(s)} />

          <SeriesGrid shows={allSeries} />
      </header>
    </div>
  );
}

export default App;
