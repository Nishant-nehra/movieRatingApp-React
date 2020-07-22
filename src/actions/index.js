// {
//     type:'ADD_MOVIES',
//     movies:[m1,m2,m3],
// }


//Action Types 
//used in reducer instead of adding string
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';


//Action creators
//used in app.js for dispatch
export function addMovies(movies) {
    return {
        type: 'ADD_MOVIES',
        movies: movies 
    }
}
export function addFavourite(movie) {
    return {
        type: 'ADD_FAVOURITE',
        movie: movie
    }
}
export function removeFavourite(movie) {
    return {
        type: 'REMOVE_FAVOURITE',
        movie: movie 
    }
}
export function setShowFavourites(val) {
    return {
        type: 'SET_SHOW_FAVOURITES',
        val:val 
    }
}