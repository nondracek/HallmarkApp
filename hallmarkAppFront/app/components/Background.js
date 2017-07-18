import React, {Component} from 'react';
import {
    Image,
} from 'react-native';
import {defaultStyles} from './style.js'

class Background extends Component {
    render() {
        return(
            <Image source={require('../files/images/background.jpg')}>
                 {this.props.children}
            </Image>
        )

    }
}

export default Background
