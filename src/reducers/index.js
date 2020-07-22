import {combineReducers} from 'redux';

import { ADD_MOVIES, ADD_FAVOURITE,REMOVE_FAVOURITE,SET_SHOW_FAVOURITES } from '../actions';


const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites:false,
}


//This function goes to index.js in src in create store
export function movies(state = initialMoviesState, action) {
    //We can do if else but in react community switch is preferred more
    // if(action.type===ADD_MOVIES){
    //     console.log("Action:",action);
    //     return{
    //         ...state,
    //         list:action.movies,
    //     } 
    // }
    // return state;
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies,
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [...state.favourites,action.movie],
            }
        case REMOVE_FAVOURITE:{
            const filteredArray=state.favourites.filter(movie=>movie.Title!==action.movie.Title);
            return{
                ...state,
                favourites:filteredArray
            }
        }
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites:action.val
            }
        default:return state;
    }
}

const initialSearchState={
    result:{}
};

export function search(state=initialSearchState,action){
    return state;
}
//This is used without combineReducers method
// const initialRootState={
//     movies:initialMoviesState,
//     search:initialSearchState
// };

// // default root reducer which contains all the reducers inside it
// export default function rootReducer(state=initialRootState,action){
//     return{
//         movies:movies(state.movies,action), //movies: managed by movies reducer
//         search:search(state.search,action)  //search: managed by search reducer
//     }
// }


//it does same as above commented lines but is easy and short to write
export default combineReducers({
    movies:movies,
    search:search
});