import React, {useState} from "react";
import '../App.css';

function SearchBarResults(props) {
    const results = props.series ? props.series.map(s => (
        <a key={s.getApiId()} onClick={() => props.selectSeries(s)}>
            {
                <img className="image-left" src={s.Image} />
            }

            <div className={`series-info`}>
                {s.Name}
                <br/>
                <sub>({s.Premiered})</sub>
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