import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

class App extends React.Component {
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log("Updated");
      this.forceUpdate();
    });
    //make API call
    //we can do this.props.store also but we have used line 8 to remove these extra words(this.props)
    store.dispatch({
      type:'ADD_MOVIES',
      movies:data //we took movies from data file
    });
    console.log("State:",this.props.store.getState());
  }

  render() {
    const movies=this.props.store.getState();
    console.log("render");
    return (
      <div className="App">
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className='tab'>Movies</div>
            <div className='tab'>Favourites</div>
          </div>
          <div className='list'>
            {movies.map((movie, index) => {
              return (<MovieCard movie={movie} key={index} />)
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
