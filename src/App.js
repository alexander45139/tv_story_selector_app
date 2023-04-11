import React from "react";
import './App.css';
import StoryInterfaceWindow from "./StoryInterface/StoryInterfaceWindow";
import HomeInterfaceWindow from "./HomeInterface/HomeInterfaceWindow";

class App extends React.Component {
    constructor() {
        super();
        sessionStorage.NodeAppDomain = `http://localhost:3000/` // `https://am2012.brighton.domains`
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
                        <HomeInterfaceWindow />
                    }

                    {
                        seriesId &&
                        <StoryInterfaceWindow seriesID={seriesId} />
                    }
                </header>
            </div>
        )
    };
}

export default App;
