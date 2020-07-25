import React from 'react';
import {addMovieToList,handleMovieSearch} from '../actions';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText:''
    };
  }

  handleAddToMovies=(movie)=>{
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults:false
    });
  }

  handleSearch=()=>{
    const {searchText}=this.state;

    //we have used this action to access api and search the movie
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange=(e)=>{
    this.setState({
      searchText:e.target.value
    });
  }

  render() {
    
    const {result,showSearchResults}=this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id='search-btn' onClick={this.handleSearch}>Search</button>
          {/* if showSearchResults is true then only below should be visible */}
          { showSearchResults &&
            <div className='search-results'>
              <div className='search-result'>
                <img src={result.Poster} alt='search-pic'/>
                <div className='movie-info'>
                  <span>{result.title}</span>
                  <button onClick={()=>this.handleAddToMovies(result)}>Add to Movies</button>
                </div>
              </div>
            </div>    
          }
        </div>
      </div>
    );
  }

}
// we don't need this because of connect from react-redux
// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search} />
//         )}
//       </StoreContext.Consumer>
//     );
//   }
// }

// export default NavbarWrapper;
function mapStateToProps({ search }) {
  return {
    // do it like this or like app.js(i like app.js one)
    search:search,
  };
}

export default connect(mapStateToProps)(Navbar);


