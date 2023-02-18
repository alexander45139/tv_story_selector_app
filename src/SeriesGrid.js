import React, {useState} from "react";
import './App.css';

function SeriesGrid(props) {
    const buttons = () => {
        props.series.map(se => (
            <button key={se.getId()}>
                {se.name}
                <br/>
                <sub>({se.premiered})</sub>
            </button>
        ))
    }

    return (
        <div>
            <p>Select a TV Series to watch:</p>
            <table>
                {buttons}
            </table>
        </div>
    );
}

export default SeriesGrid;