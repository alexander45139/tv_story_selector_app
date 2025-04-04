import React from "react";
import "./SettingsWindow.css";
import '../App.css';

function SettingsWindow(props) {
    return (
        <div className="popup-window">
            <header>
                <h2>Settings</h2>
                <a className={"close-btn"}
                   onClick={() => props.closeWindow()}
                >
                    x
                </a>
            </header>

            <div className="settings-container">
                <label>Skip Stories Watched In Last </label>
                <input type={"number"} />
                <select>
                    <option>Month(s)</option>
                    <option>Year(s)</option>
                </select>
            </div>
        </div>
    )
}

export default SettingsWindow;