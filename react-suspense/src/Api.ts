import { PaginatedResponse } from './types/PaginatedResponse';
import { People } from './types/People';
import { Planet } from './types/Planet';
import { Starship } from './types/Starship';

// Copied from the React documentation (https://reactjs.org/docs/concurrent-mode-suspense.html).
// They say it's not production ready. Not yet sure why not. 
function wrapPromise<T>(promise: Promise<T>) {
    let status = 'pending';
    let result: T;
    let suspender = promise.then(
        r => {
            status = 'success';
            result = r;
        },
        e => {
            status = 'error';
            result = e;
        }
    );
    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    };
}

export const getPeople = () => {
    return wrapPromise<PaginatedResponse<People>>(fetch('https://swapi.co/api/people').then(res => res.json()));
};

export const getPlanets = () => {
    return wrapPromise<PaginatedResponse<Planet>>(fetch('https://swapi.co/api/planets').then(res => res.json()));
};

export const getStarships = () => {
    return wrapPromise<PaginatedResponse<Starship>>(fetch('https://swapi.co/api/starships').then(res => res.json()));
};