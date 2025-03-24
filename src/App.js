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
                <header className="App-header">
                    <div className={`home-btn`}>
                        {
                            this.seriesId &&
                            <a href={`./index.html`}>&#127968;</a>
                        }
                    </div>

                    <h1>TV Story Selector</h1>

                    <button className="settings-btn">&#9965;</button>
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
