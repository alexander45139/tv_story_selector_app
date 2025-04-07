import React from "react";
import StoryInterfaceBase from "./StoryInterfaceBase";

function StoryInfo(props) {

    return (
        <div className="story-info">
            <div><b>{props.title}</b></div>
            <div>{props.value}</div>
        </div>
    )
}

export default StoryInfo;