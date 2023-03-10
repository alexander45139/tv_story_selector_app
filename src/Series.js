import {Episode} from "./Episode";

export class Series {
    constructor(tvMazeId, episodateId, imdbId, name, premiered, image) {
        this.TvMazeID = tvMazeId;
        this.EpisodateID = episodateId;
        this.ImdbID = imdbId;
        this.SeriesID = null;
        this.Name = name;
        this.Premiered = premiered;
        this.Image = image;
    }

    getApiId() {
        if (this.TvMazeID) {
            return this.TvMazeID;
        } else if (this.EpisodateID) {
            return this.EpisodateID;
        } else {
            return this.ImdbID;
        }
    }

    async postSeries() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", this.Name);
        urlencoded.append("premiered", this.Premiered);
        urlencoded.append("tvMazeId", this.TvMazeID);
        urlencoded.append("episodateId", this.EpisodateID);
        urlencoded.append("imdbId", this.ImdbID);

        fetch(`https://am2012.brighton.domains/tv_story_selector/postSeries`, {
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

    async postStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("seriesId", /*get the database table Series ID*/);

        fetch(`https://am2012.brighton.domains/tv_story_selector/postStories`, {
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
