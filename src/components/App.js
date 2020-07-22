import React from 'react';

import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,setShowFavourites} from '../actions';

class App extends React.Component {
  componentDidMount(){
    //or use this.props.store
    const {store}=this.props;
    store.subscribe(()=>{
      console.log("Updated");
      this.forceUpdate();
    });
    //make API call
    //we can do this.props.store also but we have used line 8 to remove these extra words(this.props)

    //we are now using a function to get object for dispatch from action folder
    store.dispatch(addMovies(data));  //we took movies from data file

    console.log("State:",this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{
    const {favourites}=this.props.store.getState();
    const index=favourites.indexOf(movie);
    if(index !==-1){
      //movie found
      return true;
    }
    return false;
  }

  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    const {list,favourites,showFavourites}=this.props.store.getState();
    console.log("RENDER",this.props.store.getState());
    // if showFavourites is true then display favourites tab else movies tab... favourites and list are arrays we get from props
    const displayMovie=showFavourites?favourites:list;
    return (
      <div className="App">
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            {/* for class i have used js backticks we can also do it without backticks */}
            <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className='list'>
            {displayMovie.map((movie, index) => {
              return (<MovieCard movie={movie} key={index} dispatch={this.props.store.dispatch} isMovieFavourite={this.isMovieFavourite(movie)} />)
            })}
          </div>
          {displayMovie.length===0?<div className='no-movies'>No movies to Display!</div> :''}
        </div>
      </div>
    );
  }
}

export default App;
