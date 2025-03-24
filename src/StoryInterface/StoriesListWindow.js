import React from "react";
import './StoryInterface.css';

function StoriesListWindow(props) {
    const listItems = props.stories.map(story => (
        <li key={story.StoryID}>
            <button onClick={() => props.selectStory(story)}>
                {story.Name}
            </button>
        </li>
    ));

    return (
        <div className="stories-list-window">
            <header>
                <h3>Stories</h3>
                <a className={"close-btn"}
                   onClick={() => props.closeWindow()}
                >
                    x
                </a>
            </header>

            <ol className="stories-list-container">
                {listItems}
            </ol>
        </div>
    )
}

export default StoriesListWindow;