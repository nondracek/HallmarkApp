import React, {Component} from 'react';
import {
  Text,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LogIn from './screens/LogIn';
import Measures from './screens/Measures';
import Companies from './screens/Companies';
import {styles} from './components/style';
import { apiMiddleware, reducer } from './files/redux';

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch movie data
store.dispatch({type: 'GET_MOVIE_DATA'});

const HallmarkAppFront = StackNavigator({
  LogIn: { screen: LogIn },
  Companies: { screen: Companies },
  Measures: { screen: Measures },
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 50,
        backgroundColor: '#D2D2F5',
      },
    }
  }
);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HallmarkAppFront/>
      </Provider>
    );
  }
}
