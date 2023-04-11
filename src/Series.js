import {Episode} from "./Episode";

export class Series {
    constructor(tvMazeId, episodateId, imdbId, name, premiered, image, seriesId?) {
        this.TvMazeID = tvMazeId;
        this.EpisodateID = episodateId;
        this.ImdbID = imdbId;
        this.Name = name;
        this.Premiered = premiered;
        this.Image = image;
        this.SeriesID = seriesId ? seriesId : null;
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

    postSeriesWithStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", this.Name);
        urlencoded.append("premiered", this.Premiered);
        urlencoded.append("image", this.Image);
        urlencoded.append("tvmazeid", this.TvMazeID);
        urlencoded.append("episodateid", this.EpisodateID);
        urlencoded.append("imdbid", this.ImdbID);

        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/postSeries`, {
            method: 'POST',
            body: urlencoded,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors'
        })
            .then(response => {
                console.log(response.text());

                fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/getSeriesId?name=${this.Name}&premiered=${this.Premiered}`, {method: 'GET'})
                    .then(response => response.json().then(result => {
                        this.SeriesID = result.seriesId;
                        this.postStories();
                    }))
                    .catch((err) => console.log(err));
            })
            .catch(err => console.log(err));
    }

    postStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("seriesid", this.SeriesID);

        fetch(`${sessionStorage.getItem('NodeAppDomain')}tv_story_selector/postStories`, {
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
