import {Episode} from "./Episode";

export class Series {
    constructor(tvMazeId, episodateId, imdbId, name, premiered, image) {
        this.tvMazeId = tvMazeId;
        this.episodateId = episodateId;
        this.imdbId = imdbId;
        this.name = name;
        this.premiered = premiered;
        this.image = image;
    }

    getId() {
        if (this.tvMazeId) {
            return this.tvMazeId;
        } else if (this.episodateId) {
            return this.episodateId;
        } else {
            return this.imdbId;
        }
    }

    /*async getEpisodes() {
        const episodes: Episode[] = [];

        let ep;

        if (this.tvMazeId) {
            await fetch(`https://api.tvmaze.com/shows/${this.tvMazeId}/episodes?specials=1`, {method: 'GET'})
                .then(result => result.json().then(eps => {
                    for (let epIndex in eps) {
                        ep = eps[epIndex];
                        episodes.push(new Episode(ep.season, ep.number, ep.name, ep.summary, ep.runtime));
                    }
                }))
                .catch((err) => console.error(err));
        } else if (this.episodateId) {
            await fetch(`https://www.episodate.com/api/show-details?q=${this.episodateId}`, {method: 'GET'})
                .then(result => result.json().then(data => {
                    const eps = data.tvShow.episodes;

                    for (let epIndex in eps) {
                        ep = eps[epIndex];
                        episodes.push(new Episode(ep.season, ep.episode, ep.name, null, null));
                    }
                }))
                .catch((err) => console.error(err));
        } else if (this.imdbId) {
            const getImdbEpisodes = async (season: number) => {
                return await fetch(`https://imdb-api.com/en/API/SeasonEpisodes/k_m03a8t76/${this.imdbId}/${season}`, {method: 'GET'})
                    .then(result => result.json().then(se => {
                        return se.episodes;
                    }))
                    .catch((err) => console.error(err));
            }

            let eps = [];

            let showSeason = 1;

            let seasonEpisodes = await getImdbEpisodes(showSeason);

            while (seasonEpisodes && seasonEpisodes.length > 0) {
                eps = eps.concat(seasonEpisodes);
                showSeason += 1;
                seasonEpisodes = await getImdbEpisodes(showSeason);
            }

            for (let epIndex in eps) {
                ep = eps[epIndex];
                episodes.push(new Episode(ep.seasonNumber, ep.episodeNumber, ep.title, ep.plot, null));
            }
        }

        return episodes;
    }*/

    async postSeries() {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", this.name);
        urlencoded.append("premiered", this.premiered);
        urlencoded.append("tvMazeId", this.tvMazeId);
        urlencoded.append("episodateId", this.episodateId);
        urlencoded.append("imdbId", this.imdbId);

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
