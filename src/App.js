import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";
import HomeInterface from "./HomeInterface";
import StoryInterface from "./StoryInterface";

sessionStorage.NodeAppDomain = `https://localhost` // `https://am2012.brighton.domains`

function App() {
    const urlParams = new URLSearchParams(window.location.search),
        seriesId = urlParams.get('seriesid');

    return (
        <div className="App">
            <header className="App-header">
                <h1>TV Story Selector</h1>

                {
                    !seriesId &&
                    <HomeInterface />
                }

                {
                    seriesId &&
                    <StoryInterface seriesId={seriesId} />
                }
            </header>
        </div>
    );
}

export default App;
