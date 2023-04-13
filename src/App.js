import React from "react";
import './App.css';
import StoryInterfaceWindow from "./StoryInterface/StoryInterfaceWindow";
import HomeInterfaceWindow from "./HomeInterface/HomeInterfaceWindow";

class App extends React.Component {
    constructor() {
        super();
        sessionStorage.NodeAppDomain = `http://localhost:3000/` // `https://am2012.brighton.domains`
    }

    urlParams = new URLSearchParams(window.location.search);
    seriesId = this.urlParams.get('seriesid');
    storyId = this.urlParams.get('storyid');

    render() {
        return (
            <div className="App">
                {
                    this.seriesId &&
                    <div className={`home-btn`}>
                        <a href={`./index.html`}>&#127968;</a>
                    </div>
                }
                <header className="App-header">
                    <h1>TV Story Selector</h1>

                    {
                        !this.seriesId &&
                        <HomeInterfaceWindow />
                    }

                    {
                        this.seriesId &&
                        <StoryInterfaceWindow seriesID={this.seriesId} storyID={this.storyId} />
                    }
                </header>
            </div>
        )
    };
}

export default App;
