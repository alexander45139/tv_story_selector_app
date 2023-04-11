export class Story {
    constructor(storyId, name, episodes, numberOfEpisodes, description, duration, seriesId) {
        this.StoryID = storyId;
        this.Name = name;
        this.Episodes = episodes;
        this.NumberOfEpisodes = numberOfEpisodes;
        this.Description = description;
        this.DurationMinutes = duration;
        this.SeriesID = seriesId;
    }
}
