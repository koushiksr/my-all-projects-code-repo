import React, { Suspense } from 'react';
import loadable from '@loadable/component';
import { getPeople, getPlanets } from './Api';

const LazyStarships = loadable(() => import('./LazyStarships'));

// Starts fetching the data before even rendering the component
const peopleApi = getPeople();
const planetsApi = getPlanets();

const People = () => {
    console.log('Rendering people');
    // .read() only reads the promise, it doesn't fetch any data
    const people = peopleApi.read();

    return (
        <>
            <h5>People</h5>
            <ul>
                {people?.results.map((person, index) => (
                    <li key={index}>{person.name}</li>
                ))}
            </ul>
        </>
    );
};

const Planets = () => {
    console.log('Rendering planets');
    // .read() only reads the promise, it doesn't fetch any data
    const planets = planetsApi.read();

    return (
        <>
            <h5>Planets</h5>
            <ul>
                {planets?.results.map((planet, index) => (
                    <li key={index}>{planet.name}</li>
                ))}
            </ul>
        </>
    );
};

export const StarWarsPage = () => {
    return (
        <>
            <Suspense
                fallback={<div>Loading people...</div>}>
                <People />

                <Suspense
                    fallback={<div>Loading planets...</div>}>
                    <Planets />
                </Suspense>
            </Suspense>

            <Suspense
                fallback={<div>Loading starships...</div>}>
                <LazyStarships />
            </Suspense>
        </>
    );
};