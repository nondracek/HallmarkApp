import {
    AppRegistry,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './Home'
import CompanyDetails from './CompanyDetails'
import {recentChats} from './ChatContacts'
import {SimpleSlider} from './ChatContacts'
import {styles} from './components/style'


const businessScreenNavigator = TabNavigator({
    Details: { screen: CompanyDetails },
    Recent: { screen: SimpleSlider },
})

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: businessScreenNavigator },
});

SimpleApp.navigationOptions = {
    headerTintColor: 'green',
    headerStyle: styles.header,
}

businessScreenNavigator.navigationOptions = {
    headerStyle: styles.header,
    headersTintColor: 'green'
}




AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
