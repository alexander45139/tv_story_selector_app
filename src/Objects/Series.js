export class Series {
    constructor(tvMazeId, episodateId, imdbId, name, premiered, image, seriesId = null) {
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

    async postStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("seriesid", this.SeriesID);

        await fetch(`${sessionStorage.getItem('NodeAppDomain')}postStories`, {
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

    async postSeriesWithStories() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", this.Name);
        urlencoded.append("premiered", this.Premiered);
        urlencoded.append("image", this.Image);
        urlencoded.append("tvmazeid", this.TvMazeID);
        urlencoded.append("episodateid", this.EpisodateID);
        urlencoded.append("imdbid", this.ImdbID);

        await fetch(`${sessionStorage.getItem('NodeAppDomain')}postSeries`, {
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

        await fetch(`${sessionStorage.getItem('NodeAppDomain')}getSeriesId?name=${this.Name}&premiered=${this.Premiered}`, {method: 'GET'})
            .then(response => response.json().then(result => {
                this.SeriesID = result.seriesId;
            }))
            .catch((err) => console.log(err));

        await this.postStories();
    }
}
