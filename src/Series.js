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

        fetch(`${sessionStorage.getItem('NodeAppDomain')}/tv_story_selector/postSeries`, {
            method: 'POST',
            body: urlencoded,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors'
        })
            .then(response => {
                console.log(response.text());
                this.SeriesID = response.data.id;
            })
            .catch(err => console.log(err));
    }

    async postStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("seriesId", this.SeriesID);

        fetch(`${sessionStorage.getItem('NodeAppDomain')}/tv_story_selector/postStories`, {
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
