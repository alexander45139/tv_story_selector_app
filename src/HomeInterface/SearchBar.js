import React, {useState} from "react";
import './HomeInterface.css';
import SearchBarResults from "./SearchBarResults";
import {Series} from "../Objects/Series";

function SearchBar(props) {
    const [seriesSearchOptions, setSeriesSearchOptions] : Series[] = useState(null);

    const searchSeries = (event) => {
        let value = event.target.value;

        if (value === ``) {
            setSeriesSearchOptions(null);
        } else {
            fetch(`https://api.tvmaze.com/search/shows?q=${value}`, { method: 'GET' })
                .then(result => result.json().then(data => {
                    if (data.length > 0) {
                        const sO = data.map(d => {
                            const show = d.show;
                            return new Series(show.id, null, null, show.name, show.premiered ? show.premiered.slice(0, 4) : null, show.image ? show.image.medium : null);
                        });
                        setSeriesSearchOptions(sO.length > 4 ? sO.slice(0, 4) : sO);
                    } else {
                        setSeriesSearchOptions([]);
                    }
                }))
                .catch((err) => {
                    console.error(err);

                    fetch(`https://www.episodate.com/api/search?q=${value}`, { method: 'GET' })
                        .then(result => result.json().then(data => {
                            if (data.tv_shows.length > 0) {
                                const sO = data.tv_shows.map(d =>
                                    new Series(null, d.id, null, d.name, d.start_date ? d.start_date.slice(0, 4) : null, d.image_thumbnail_path)
                                );
                                setSeriesSearchOptions(sO.length > 4 ? sO.slice(0, 4) : sO);
                            } else {
                                setSeriesSearchOptions([]);
                            }
                        }))
                        .catch((err) => {
                            console.error(err);

                            fetch(`https://imdb-api.com/en/API/SearchSeries/k_m03a8t76/${value}`, { method: 'GET' })
                                .then(result => result.json().then(data => {
                                    if (data.results.length > 0) {
                                        const sO = data.results.map(d =>
                                            new Series(null, null, d.id, d.title, d.description.slice(0, 4), d.image)
                                        );
                                        setSeriesSearchOptions(sO.length > 4 ? sO.slice(0, 4) : sO);
                                    } else {
                                        setSeriesSearchOptions([]);
                                    }

                                }))
                                .catch((err) => {
                                    console.error(err);
                                });
                        });
                });
        }
    }

    return (
        <div>
            {
                props.isLoading &&
                <input className={`search-bar`} disabled={true} placeholder={`Loading new series. Please wait...`} />
            }
            {
                !props.isLoading &&
                <input className={`search-bar`} onChange={searchSeries} type={"search"} />
            }

            {
                (!props.isLoading && seriesSearchOptions) &&
                <SearchBarResults series={seriesSearchOptions} selectSeries={(s) => {
                    document.querySelector(`.search-bar`).value = ``;
                    setSeriesSearchOptions(null);
                    props.selectSeries(s);
                }} />
            }
        </div>
    );
}

export default SearchBar;