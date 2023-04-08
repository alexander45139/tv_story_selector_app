import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";
import HomeInterface from "./HomeInterface";
import StoryInterface from "./StoryInterface";

class App extends React.Component {
    constructor() {
        super();
        sessionStorage.NodeAppDomain = `http://localhost:3000/` // `https://am2012.brighton.domains`

        this.state = {
            allSeries: []
        };
    }

    componentDidMount() {
        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/getAllSeries`, {method: 'GET'})
          .then(response => response.json().then(results => {
              this.setState({allSeries: results.series});
          }))
          .catch((err) => console.log(err));
    }

    render() {
        const urlParams = new URLSearchParams(window.location.search),
            seriesId = urlParams.get('seriesid');

        return (
            <div className="App">
                <header className="App-header">
                    <h1>TV Story Selector</h1>

                    {
                        !seriesId &&
                        <HomeInterface allSeries={this.state.allSeries} />
                    }

                    {
                        seriesId &&
                        <StoryInterface seriesId={seriesId} />
                    }
                </header>
            </div>
        )
    };
}

export default App;
