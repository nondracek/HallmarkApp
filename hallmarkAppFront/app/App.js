import {
    AppRegistry,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './screens/Home'
import Measures from './screens/Measures'
import Companies from './screens/Companies'
import {styles} from './components/style'


export const hallmarkAppFront = StackNavigator({
  Companies: { screen: Companies },
  Measures: { screen: Measures },
});
