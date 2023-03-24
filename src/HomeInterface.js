import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";

function HomeInterface() {
  const [allSeries, setAllSeries] : Series[] = useState([new Series(7, null, null, "This", 2000, null), new Series(8, null, null, "That", 2010, null), new Series(9, null, null, "Now", 2011, null), new Series(10, null, null, "Then", 2001, null)]);

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
    <div>
      <h2>Home</h2>

      <SearchBar selectSeries={(s) => addToSeries(s)} />

      <SeriesGrid shows={allSeries} />
    </div>
  );
}

export default HomeInterface;
