import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { defaultStyles } from './style';
import { buttonImage } from '../files/data';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;

export default class MeasureButton extends Component {
  // Component prop types
  static propTypes = {
    // Measure Object
    measureTypes: PropTypes.object.isRequired,
    // Called when user taps on measure button
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const { measureTypes, measureTypes: { title }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(measureTypes)}>
        <View style={styles.imageContainer}>
          <Image source={require('../files/button.png')} resizeMode= 'contain' style={styles.image}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </Image>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 10,                 // rounded corners
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
});
