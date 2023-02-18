import React, {useState} from "react";
import './App.css';
import {Series} from "./Series";

function SearchBarResults(props) {
    const results = props.series ? props.series.map(s => (
        <a key={s.getId()} onClick={() => props.selectSeries(s)}>
            {
                <img className="image-left" src={s.image} />
            }

            <div className={`series-info`}>
                {s.name}
                <br/>
                <sub>({s.premiered})</sub>
            </div>
        </a>
    )) : null;

    return (
        <div className="search-bar-results">
            {results}

            {
                results.length < 1 &&
                <div className={`no-results`}>NO RESULTS</div>
            }
        </div>
    );
}

export default SearchBarResults;