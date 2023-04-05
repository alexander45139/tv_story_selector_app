import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";
import {render} from "react-dom";

function HomeInterface(props) {
  const [allSeries, setAllSeries] : Series[] = useState(props.allSeries);

  const addToSeries = (show) => {
      const newAllSeries = allSeries;

      if (allSeries.filter(se => se.getApiId() === show.getApiId()) < 1) {
          show.postSeriesWithStories();
          newAllSeries.push(show);
          setAllSeries(newAllSeries);
      } else {
          alert(`This series has already been added`);
      }
  }

  return (
    <div>
      <h2>Home</h2>

      <SearchBar selectSeries={(s) => addToSeries(s)} />

      <SeriesGrid shows={allSeries} />
    </div>
  );
}

export default HomeInterface;
