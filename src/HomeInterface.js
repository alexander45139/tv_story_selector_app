import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";

function HomeInterface() {
  const [allSeries, setAllSeries] : Series[] = useState([]);

  const getAndSetAllSeries = async () => {
      fetch(`${sessionStorage.getItem('NodeAppDomain')}/tv_story_selector/getAllSeries`, {method: 'GET'})
          .then(response => response.json().then(results => {
              setAllSeries(results.series);
          }))
          .catch((err) => console.log(err));
  }

  const addToSeries = async (show) => {
      const newAllSeries = allSeries;

      if (allSeries.filter(se => se.getApiId() === show.getApiId()) < 1) {
          await show.postSeries();
          show.postStories();

          newAllSeries.push(show);
          setAllSeries(newAllSeries);
      } else {
          alert(`This series has already been added`);
      }
  }

  if (allSeries.length < 1) {
      getAndSetAllSeries();
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
