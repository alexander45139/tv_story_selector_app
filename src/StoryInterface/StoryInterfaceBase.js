import React from "react";
import './StoryInterface.css';

function StoryInterfaceBase(props) {
    const lastWatchedDateStr = () => {
        const lastWatched = props.story.LastWatched;

        if (lastWatched) {
            return lastWatched.substr(0, lastWatched.indexOf("T"));
        } else {
            return null;
        }
    };

    return (
        <div className="story-interface-container">
            <h2>Story</h2>

            {
                props.series &&
                <h3>{props.series.Name} ({props.series.Premiered})</h3>
            }

            {
                props.story &&
                <div className="story-info-container">
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

                    <table>
                        <tr>
                            <td>Story Name: </td>
                            <td>{props.story.Name}</td>
                        </tr>
                        <tr>
                            <td>Episode(s): </td>
                            <td>{props.story.Episodes}</td>
                        </tr>
                        <tr>
                            <td>Number of Episodes: </td>
                            <td>{props.story.NumberOfEpisodes}</td>
                        </tr>
                        <tr>
                            <td>Last Watched: </td>
                            <td>{lastWatchedDateStr()}</td>
                        </tr>
                        <tr>
                            <td>Total Duration: </td>
                            <td>{props.story.DurationMinutes}</td>
                        </tr>
                        <tr>
                            <td>Rating: </td>
                            <td></td>
                        </tr>
                    </table>

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
