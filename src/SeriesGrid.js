import React, {useState} from "react";
import {Series} from "./Series";
import './App.css';

function SeriesGrid(props) {
    const goToStoryInterface = (seriesId) => {
        window.location.href = `./index.html?seriesid=${seriesId}`;
    }

    const buttons = props.shows.map(sh => (
        <div className={`grid-item`}>
            <button onClick={() => goToStoryInterface(sh.SeriesID)} key={sh.getApiId()}>
                {sh.Name}
                <br/>
                <sub>({sh.Premiered})</sub>
            </button>
        </div>
    ));

    return (
        <div>
            <p>Select a TV Series to watch:</p>

            {
                buttons.length > 0 &&
                <button onClick={() => {
                    const randomIndex = Math.floor(Math.random() * (props.shows.length - 1));
                    goToStoryInterface(props.shows[randomIndex].SeriesID);
                }} className={`random-btn`}>
                    ?
                </button>
            }

            <div className={buttons.length > 3 ? `grid-container four` : buttons.length > 2 ? `grid-container three` : buttons.length > 1 ? `grid-container two` : ``}>
                {buttons}
            </div>
        </div>
    );
}

export default SeriesGrid;