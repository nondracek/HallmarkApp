import React, {Component} from 'react';
import {
    Image,
} from 'react-native';
import {styles} from './style.js'

class Background extends Component {
    render() {
        return(
            <Image source={require('../files/background.jpg')}
                 style={styles.background}>
                 {this.props.children}
            </Image>
        )

    }
}

export default Background
