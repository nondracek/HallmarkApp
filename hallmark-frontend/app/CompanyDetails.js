import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View
} from 'react-native';

class ChatScreen extends Component {
    static navigationOptions = ({navigation}) => {
    };
    render() {
        return(
            <View>
                <Text>Hell, Lets Chat!</Text>
            </View>
        )

    }
}

export default ChatScreen
