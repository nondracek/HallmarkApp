import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import {styles} from './style.js'

export class ButtonImage extends Component {
    render() {

        return(
            <Image
                source={require('../files/button.png')}
                style={styles.button}
                resizeMode='contain'
            >
                {this.props.children}
            </Image>
        )

    }
}
