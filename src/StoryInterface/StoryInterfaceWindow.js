import React from "react";
import '../index.css';
import {Series} from "../Objects/Series";
import {Story} from "../Objects/Story";
import StoryInterfaceBase from "./StoryInterfaceBase";

class StoryInterfaceWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            story: new Story(),
            isStoryWatched: null,
            series: null
        }
    }

    getRandomStory(stories) {
        const randomIndex = Math.floor(Math.random() * (stories.length - 1));
        this.setState({isStoryWatched: (stories[randomIndex].LastWatched !== null)});
        return stories[randomIndex];
    }

    handleWatchedBtn() {
        const updatedStory = this.state.story;
        updatedStory.LastWatched = new Date().toISOString();
        this.setState({
            story: updatedStory,
            isStoryWatched: true
        });
        this.props.story.markAsWatched();
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
                        st.LastWatched,
                        st.SeriesID
                    )
                );

                let thisStory;

                if (this.props.storyID) {
                    thisStory = allFetchedStories.filter(fs => fs.StoryID === this.props.storyID);
                } else {
                    thisStory = this.getRandomStory(allFetchedStories);
                }

                this.setState({
                    stories: allFetchedStories,
                    story: thisStory,
                    isStoryWatched: (thisStory.LastWatched !== null),
                    series: results.series
                });
            }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <StoryInterfaceBase story={this.state.story}
                                    series={this.state.series}
                                    onSelectRandomStory={() => this.setState({
                                        story: this.getRandomStory(this.state.stories)
                                    })}
                                    onClickWatchedBtn={() => this.handleWatchedBtn()}
                                    isWatchedBtnDisabled={this.state.isStoryWatched}
                />
            </div>
        );
    }


}

export default StoryInterfaceWindow;
