export class Story {
    constructor(storyId, name, episodes, numberOfEpisodes, description, duration, lastWatched, seriesId) {
        this.StoryID = storyId;
        this.Name = name;
        this.Episodes = episodes;
        this.NumberOfEpisodes = numberOfEpisodes;
        this.Description = description;
        this.DurationMinutes = duration;
        this.LastWatched = lastWatched;
        this.SeriesID = seriesId;
    }

    markAsWatched() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("storyid", this.StoryID);

        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/markStoryAsWatched`, {
            method: 'POST',
            body: urlencoded,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors'
        })
            .then(response => {
                console.log(response.text());
            })
            .catch(err => console.log(err));
    }
}
