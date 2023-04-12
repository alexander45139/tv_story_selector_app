import React from "react";
import '../App.css';
import {Series} from "../Objects/Series";
import {Story} from "../Objects/Story";
import StoryInterfaceBase from "./StoryInterfaceBase";

class StoryInterfaceWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            story: new Story(),
            series: null
        }
    }

    componentDidMount() {
        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/getStories?seriesid=${this.props.seriesID}`, {method: 'GET'})
            .then(response => response.json().then(results => {
                const allFetchedStories: Series[] = results.stories.map(st =>
                    new Story(
                        st.StoryID,
                        st.Name,
                        st.Episodes,
                        st.NumberOfEpisodes,
                        st.Description,
                        st.DurationMinutes,
                        st.SeriesID
                    )
                );

                let thisStory = new Story();

                if (this.props.storyID) {
                    thisStory = allFetchedStories.filter(fs => fs.StoryID === this.props.storyID);
                } else {
                    const randomIndex = Math.floor(Math.random() * (allFetchedStories.length - 1));
                    thisStory = allFetchedStories[randomIndex];
                }

                this.setState({
                    stories: allFetchedStories,
                    story: thisStory,
                    series: results.series
                });
            }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <StoryInterfaceBase story={this.state.story} series={this.state.series} />
        );
    }


}

export default StoryInterfaceWindow;
