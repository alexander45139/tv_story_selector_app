import React, {useState} from "react";
import '../App.css';
import {Series} from "../Objects/Series";
import {Story} from "../Objects/Story";
import StoryInterfaceBase from "./StoryInterfaceBase";

class StoryInterfaceWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
    }

    componentDidMount() {
        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/getStories?seriesid=${this.props.seriesID}`, {method: 'GET'})
            .then(response => response.json().then(results => {
                const allFetchedStories: Series[] = results.stories.map(st =>
                    new Story(st.StoryID, st.Name, st.ImdbID, st.Name, st.Premiered, st.Image, st.SeriesID)
                );
                this.setState({stories: allFetchedStories});
            }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <StoryInterfaceBase />
        );
    }


}

export default StoryInterfaceWindow;
