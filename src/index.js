import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//function by currying -> function logger(obj,next,action)
// const logger=function({dispatch,getState}){
//   return function (next){
//     return function (action){
//       //middleware code 
//       console.log("ACTION_TYPE is:",action.type);
//       next(action);
//     }
//   }
// }

//modified middleware only another way to write it. It doesnt affect any functionalities
const logger = ({ dispatch, getState }) => (next) => (action) => {
  //middleware code 
  if(typeof action!=='function'){
    console.log("ACTION_TYPE is:", action.type);
  }
  next(action);
};

//middleware 2 used for api
// this middleware works if instead of object action creator returns a function
// but we have used thunk middleware to do this without writing a single line of code
// we just have to import it and use it in createStore->applyMiddleware
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if(typeof action==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger,thunk));
console.log("store functions that we can use", store);

// No need for this as provider from react-redux will take care of it

// export const StoreContext=createContext();
// console.log("StoreContext",StoreContext);
// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// No need for connect function->provider from react-redux does this for us                 
// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

// console.log("Before State:",store.getState());
// Update store by dispatching actions
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });

// console.log("After State:",store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
