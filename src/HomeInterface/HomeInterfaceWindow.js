import React from "react";
import { Series } from "../Objects/Series";
import HomeInterfaceBase from "./HomeInterfaceBase";

class HomeInterfaceWindow extends React.Component {
    constructor() {
        super();
        this.state = {
            allSeries: []
        }
    }

    componentDidMount() {
        fetch(`${sessionStorage.getItem('NodeAppDomain')}getAllSeries`, {method: 'GET'})
            .then(response => response.json().then(results => {
                const allFetchedSeries = results.series.map(se =>
                    new Series(se.TvMazeID, se.EpisodateID, se.ImdbID, se.Name, se.Premiered, se.Image, se.SeriesID)
                );
                this.setState({allSeries: allFetchedSeries});
            }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <HomeInterfaceBase allSeries={this.state.allSeries}
                onChange={(newShows) => this.setState({allSeries: newShows})}
            />
        );
    }
}

export default HomeInterfaceWindow;
