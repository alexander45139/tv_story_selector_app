import React from "react";
import './App.css';
import StoryInterfaceWindow from "./StoryInterface/StoryInterfaceWindow";
import HomeInterfaceWindow from "./HomeInterface/HomeInterfaceWindow";

class App extends React.Component {
    constructor() {
        super();
        sessionStorage.NodeAppDomain = `http://localhost:3000/tv_story_selector/`; // `http://localhost:3000/tv_story_selector/` `https://am2012.brighton.domainstv_story_selector/`
    }

    urlParams = new URLSearchParams(window.location.search);
    seriesId = this.urlParams.get('seriesid');

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
                </header>

                <main className="App-main">
                    {
                        !this.seriesId &&
                        <HomeInterfaceWindow />
                    }

                    {
                        this.seriesId &&
                        <StoryInterfaceWindow seriesID={this.seriesId} />
                    }
                </main>
            </div>
        )
    };
}

export default App;
