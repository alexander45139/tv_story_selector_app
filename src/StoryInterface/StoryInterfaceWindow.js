import React from "react";
import './StoryInterface.css';
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

    theDate = new Date();
    sixMonthsAgoAsStr;

    getRandomStory(stories) {
        const randomIndex = Math.floor(Math.random() * (stories.length - 1));
        const lastWatched = stories[randomIndex].LastWatched;
        this.setState({isStoryWatched: (lastWatched !== null) && (lastWatched <= this.sixMonthsAgoAsStr)});
        return stories[randomIndex];
    }

    handleWatchedBtn() {
        const updatedStory = this.state.story;
        updatedStory.LastWatched = new Date().toISOString();

        let newStories = this.state.stories;
        newStories = newStories.filter(st => st.StoryID !== updatedStory.StoryID);

        this.state.story.markAsWatched();

        this.setState({
            stories: newStories,
            story: updatedStory,
            isStoryWatched: true
        });
    }

    componentDidMount() {
        this.theDate.setMonth(this.theDate.getMonth() - 6);
        this.sixMonthsAgoAsStr = this.theDate.toISOString().replace("T", " ").replace("Z", "");

        fetch(`${sessionStorage.getItem('NodeAppDomain')}getStories?seriesid=${this.props.seriesID}&maxlastwatched=${this.sixMonthsAgoAsStr}`, {method: 'GET'})
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

                const thisStory = this.getRandomStory(allFetchedStories);

                this.setState({
                    stories: allFetchedStories,
                    story: thisStory,
                    isStoryWatched: (thisStory.LastWatched !== null) && (thisStory.LastWatched <= this.sixMonthsAgoAsStr),
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
