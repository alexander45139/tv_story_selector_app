import React, {useState} from "react";
import {Series} from "./Series";
import './App.css';

function SeriesGrid(props) {
    const buttons = props.shows.map(sh => (
        <button onClick={() => window.location.href = `./index.html?seriesid=${sh.SeriesID}`} key={sh.getApiId()}>
            {sh.Name}
            <br/>
            <sub>({sh.Premiered})</sub>
        </button>
    ));

    return (
        <div>
            <p>Select a TV Series to watch:</p>
            <div>
                {buttons}
            </div>
        </div>
    );
}

export default SeriesGrid;