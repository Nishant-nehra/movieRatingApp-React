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
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';


//Action creators
//used in app.js for dispatch
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies: movies
    }
}
export function addFavourite(movie) {
    return {
        type: ADD_FAVOURITE,
        movie: movie
    }
}
export function removeFavourite(movie) {
    return {
        type: REMOVE_FAVOURITE,
        movie: movie
    }
}
export function setShowFavourites(val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val: val
    }
}
export function addMovieToList(movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie: movie
    }
}

export function handleMovieSearch(movie) {
    // we have used backticks otherwise do string concatination
    const url = `http://www.omdbapi.com/?apikey=7f0046d9&t=${movie}`;
    return function (dispatch) {
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log("Movie:", movie);

                //DISPATCH an action
                // we are calling the funtion that we have written bellow this
                dispatch(addSearchResult(movie));
            });
    }
}
export function addSearchResult(movie) {
    return {
        type: ADD_SEARCH_RESULT,
        movie: movie
    }
}
