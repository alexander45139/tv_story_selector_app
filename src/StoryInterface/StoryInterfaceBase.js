import React, {useState} from "react";
import '../App.css';

function StoryInterfaceBase() {
    return (
        <div>
            <h2>Story</h2>

            <table>
                <tr>
                    <td>Story Name: </td>
                    <td>This</td>
                </tr>
                <tr>
                    <td>Episode(s): </td>
                    <td>This</td>
                </tr>
                <tr>
                    <td>Number of Episodes: </td>
                    <td>This</td>
                </tr>
                <tr>
                    <td>Last Watched: </td>
                    <td>This</td>
                </tr>
                <tr>
                    <td>Total Duration: </td>
                    <td>This</td>
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