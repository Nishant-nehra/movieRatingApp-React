import React from 'react';
import { connect } from 'react-redux';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,setShowFavourites} from '../actions';


class App extends React.Component {
  componentDidMount(){
    //or use this.props.store

    //we are not using subscribe here after using connect from react-redux
    // const {store}=this.props;
    // store.subscribe(()=>{
    //   console.log("Updated");
    //   this.forceUpdate();
    // });
    //make API call
    //we can do this.props.store also but we have used line 8 to remove these extra words(this.props)

    //we are now using a function to get object for dispatch from action folder
    this.props.dispatch(addMovies(data));  //we took movies from data file

    // console.log("State:",this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{
    const {movies}=this.props;
    const index=movies.favourites.indexOf(movie);
    if(index !==-1){
      //movie found
      return true;
    }
    return false;
  }

  onChangeTab=(val)=>{
    this.props.dispatch(setShowFavourites(val));
  }

  render() {
    const {movies,search}=this.props; //{ movies:{},search:{}}
    const {list,favourites,showFavourites}=movies;
    console.log("RENDER",this.props);
    // if showFavourites is true then display favourites tab else movies tab... favourites and list are arrays we get from props
    const displayMovie=showFavourites?favourites:list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.dispatch} search={search} />
        <div className='main'>
          <div className='tabs'>
            {/* for class i have used js backticks we can also do it without backticks */}
            <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className='list'>
            {displayMovie.map((movie, index) => {
              return (<MovieCard movie={movie} key={index} dispatch={this.props.dispatch} isMovieFavourite={this.isMovieFavourite(movie)} />)
            })}
          </div>
          {displayMovie.length===0?<div className='no-movies'>No movies to Display!</div> :''}
        </div>
      </div>
    );
  }
}

//No appWrapper required after using connect
// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;