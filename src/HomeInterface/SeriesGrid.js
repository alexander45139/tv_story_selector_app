import React from "react";
import './HomeInterface.css';

function SeriesGrid(props) {
    const goToStoryInterface = (seriesId) => {
        window.location.href = `./index.html?seriesid=${seriesId}`;
    }

    const buttons = (props.shows && props.shows.length > 0) ? props.shows.map(sh => (
        <div className={`grid-item`}>
            <button onClick={() => goToStoryInterface(sh.SeriesID)} key={sh.SeriesID ? sh.SeriesID : sh.getApiId()}>
                {sh.Name}
                <br/>
                <sub>({sh.Premiered})</sub>
            </button>
        </div>
    )) : null;

    return (
        <div>
            <p>Select a TV Series to watch:</p>

            {
                (buttons && !props.isLoading) &&
                <div>
                    <button onClick={() => {
                        const randomIndex = Math.floor(Math.random() * props.shows.length);
                        goToStoryInterface(props.shows[randomIndex].SeriesID);
                    }} className={`random-btn`}>
                        ?
                    </button>

                    <div className={buttons.length > 3 ? `grid-container four` : buttons.length > 2 ? `grid-container three` : buttons.length > 1 ? `grid-container two` : ``}>
                        {buttons}
                    </div>
                </div>
            }

            {
                props.isLoading &&
                <div align={`center`}>
                    <div className={`loader`}></div>
                </div>
            }
        </div>
    );
}

export default SeriesGrid;