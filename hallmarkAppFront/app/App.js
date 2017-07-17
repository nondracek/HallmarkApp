import {
    AppRegistry,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './screens/Home'
import Measures from './screens/Measures'
import {styles} from './components/style'


export const hallmarkAppFront = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: Measures },
});
