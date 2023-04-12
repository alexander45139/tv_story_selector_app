import React from "react";
import '../App.css';

function StoryInterfaceBase(props) {
    return (
        <div>
            <h2>Story</h2>

            {
                props.series &&
                <h3>{props.series.Name} ({props.series.Premiered})</h3>
            }

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
                    <td>This</td>
                </tr>
                <tr>
                    <td>Total Duration: </td>
                    <td>{props.story.DurationMinutes}</td>
                </tr>
                <tr>
                    <td>Rating: </td>
                    <td>This</td>
                </tr>
            </table>
        </div>
    );
}

export default StoryInterfaceBase;
