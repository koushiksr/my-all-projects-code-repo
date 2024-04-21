import React from 'react';
import { getStarships } from './Api';

// Starts fetching the data before even rendering the component
const starshipsApi = getStarships();

export const LazyStarships = () => {
    console.log('rendering LazyStarships');

    // .read() only reads the promise, it doesn't fetch any data
    const starships = starshipsApi.read();

    return (
        <>
            <h5>Starships</h5>
            <ul>
                {starships?.results.map((starship, index) => (
                    <li key={index}>{starship.name}</li>
                ))}
            </ul>
        </>
    );
};

export default LazyStarships;