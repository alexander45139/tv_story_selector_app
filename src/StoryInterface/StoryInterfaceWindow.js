import React from "react";
import './StoryInterface.css';
import {Series} from "../Objects/Series";
import {Story} from "../Objects/Story";
import StoryInterfaceBase from "./StoryInterfaceBase";
import StoriesListWindow from "./StoriesListWindow";

class StoryInterfaceWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            story: new Story(),
            isStoryWatched: null,
            series: null,
            isStoriesListShown: false
        }
    }

    theDate = new Date();
    timeSpanToSkipLastWatchedStoriesAsStr;

    getRandomStory(stories) {
        const filteredStories = stories.filter(st => (st.LastWatched == null) || (st.LastWatched < this.timeSpanToSkipLastWatchedStoriesAsStr));
        const randomIndex = Math.floor(Math.random() * (filteredStories.length - 1));
        const lastWatched = filteredStories[randomIndex].LastWatched;
        this.setState({isStoryWatched: (lastWatched !== null) && (lastWatched <= this.timeSpanToSkipLastWatchedStoriesAsStr)});
        return filteredStories[randomIndex];
    }

    handleWatchedBtn() {
        const updatedStory = this.state.story;
        updatedStory.LastWatched = new Date().toISOString();

        this.state.story.markAsWatched();

        this.setState({
            story: updatedStory,
            isStoryWatched: true
        });
    }

    componentDidMount() {
        this.theDate.setMonth(this.theDate.getMonth() - 6);
        this.timeSpanToSkipLastWatchedStoriesAsStr = this.theDate.toISOString().replace("T", " ").replace("Z", "");

        fetch(`${sessionStorage.getItem('NodeAppDomain')}getStories?seriesid=${this.props.seriesID}`, {method: 'GET'})
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
                    isStoryWatched: (thisStory.LastWatched !== null) && (thisStory.LastWatched <= this.timeSpanToSkipLastWatchedStoriesAsStr),
                    series: results.series
                });
            }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                {
                    this.state.isStoriesListShown &&
                    <StoriesListWindow stories={this.state.stories}
                                       selectStory={(s) => this.setState({
                                           story: s,
                                           isStoriesListShown: false,
                                           isStoryWatched: false
                                       })}
                                       closeWindow={() => this.setState({
                                           isStoriesListShown: false
                                       })}
                    />
                }

                <StoryInterfaceBase story={this.state.story}
                                    series={this.state.series}
                                    onSelectRandomStory={() => this.setState({
                                        story: this.getRandomStory(this.state.stories)
                                    })}
                                    showStoriesList={() => this.setState({isStoriesListShown: true})}
                                    onClickWatchedBtn={() => this.handleWatchedBtn()}
                                    isWatchedBtnDisabled={this.state.isStoryWatched}
                />
            </div>
        );
    }
}

export default StoryInterfaceWindow;
