import React from "react";
import './StoryInterface.css';

function StoriesList(props) {
    const listItems = props.stories.map(story => (
        <a><li>{story.Name}</li></a>
    ));

    return (
        <div className="stories-list-container">
            <h3>Stories</h3>

            <ol>
                {listItems}
            </ol>
        </div>
    )
}

export default StoriesList;