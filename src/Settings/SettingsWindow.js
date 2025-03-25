import React from "react";
import
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

            </div>
        </div>
    )
}

export default SettingsWindow;