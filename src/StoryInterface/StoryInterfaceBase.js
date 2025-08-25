import React from "react";
import './StoryInterface.css';
import StoryInfo from './StoryInfo';

function StoryInterfaceBase(props) {
    const lastWatchedDateStr = props.story.LastWatched?.substr(0, props.story.LastWatched.indexOf("T"));

    return (
        <div className="story-interface-container">
            <h2>Story</h2>

            {
                props.series &&
                <h3>{props.series.Name} ({props.series.Premiered})</h3>
            }

            {
                props.story &&
                <div className="story-container">
                    <div className="story-btns-container">
                        <button className={`refresh-btn`}
                                onClick={() => props.onSelectRandomStory()}
                        >
                            &#128260;
                        </button>

                        <button className="choose-stories-btn"
                                onClick={() => props.showStoriesList()}
                        >
                            &#9776;
                        </button>
                    </div>

                    <div className="story-info-container">
                        <StoryInfo title={"Story Name"} value={props.story.Name} />
                        <StoryInfo title={"Episode(s)"} value={props.story.Episodes} />
                        <StoryInfo title={"Number of Episodes"} value={props.story.NumberOfEpisodes} />
                        <StoryInfo title={"Last Watched"} value={lastWatchedDateStr} />
                        <StoryInfo title={"Total Duration"} value={props.story.DurationMinutes} />
                        <StoryInfo title={"Rating"} value={""} />
                    </div>

                    <button className={`watched-btn`}
                            onClick={() => props.onClickWatchedBtn()}
                            disabled={props.isWatchedBtnDisabled}
                    >WATCHED</button>
                </div>
            }
            {
                !props.story &&
                <p>
                    <b>
                        No story available.
                        <br/>
                        Go back to Home page!
                    </b>
                </p>
            }
        </div>
    );
}

export default StoryInterfaceBase;
