import React from "react";
import '../App.css';
import SearchBar from "./SearchBar";
import SeriesGrid from "./SeriesGrid";

function HomeInterfaceBase(props) {
    const addToSeries = (show) => {
        if (props.allSeries.filter(se => se.getApiId() === show.getApiId()).length < 1) {
            const newAllSeries = props.allSeries;

            show.postSeriesWithStories();
            newAllSeries.push(show);
            props.onChange(show);
        } else {
            alert(`This series has already been added`);
        }
    }

    return (
        <div>
            <h2>Home</h2>

            <SearchBar selectSeries={(s) => addToSeries(s)} />

            <SeriesGrid shows={props.allSeries} />
        </div>
    );
}

export default HomeInterfaceBase;
