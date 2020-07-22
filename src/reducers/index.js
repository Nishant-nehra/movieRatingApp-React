import { ADD_MOVIES, ADD_FAVOURITE,REMOVE_FAVOURITE,SET_SHOW_FAVOURITES } from '../actions';


const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites:false,
}


//This function goes to index.js in src in create store
export default function movies(state = initialMoviesState, action) {
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