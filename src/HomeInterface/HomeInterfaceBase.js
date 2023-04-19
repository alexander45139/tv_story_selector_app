import React, {useState} from "react";
import SearchBar from "./SearchBar";
import SeriesGrid from "./SeriesGrid";

function HomeInterfaceBase(props) {
    const [isLoading, setIsLoading] = useState(false);

    const addToSeries = async (show) => {
        if (props.allSeries.filter(se => se.getApiId() === show.getApiId()).length < 1) {
            const newAllSeries = props.allSeries;

            setIsLoading(true);
            await show.postSeriesWithStories();
            setIsLoading(false);

            newAllSeries.push(show);
            props.onChange(newAllSeries);
        } else {
            alert(`This series has already been added`);
        }
    }

    return (
        <div>
            <h2>Home</h2>

            <SearchBar selectSeries={(s) => addToSeries(s)}
                       isLoading={isLoading}
            />

            <SeriesGrid shows={props.allSeries}
                        isLoading={isLoading}
            />
        </div>
    );
}

export default HomeInterfaceBase;
