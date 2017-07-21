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
import { measureButtons } from '../files/data'

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 4;

export default class MeasureButton extends Component {

  // Dynamic to create a space for logo on packground
  getStyles = () => {
   return {
     IDFour: (measureTypes.indexOf(this.props.measure) === 3) ? {
       marginRight: (width - 10) / cols,
     } : {},
    };
  }



  // Component prop types
  static propTypes = {
    // Measure Object
    measure: PropTypes.object.isRequired,
    // Called when user taps on measure button
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const { measure, imgNum, measure: { measureTitle }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(measure)}>
        <View style={styles.imageContainer}>
          <Image source={require('../files/images/blank-purple-button.png')} resizeMode= 'contain' style={styles.image}>
            <Text style={styles.buttonLabel}>{measureTitle}</Text>
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
    height: ((height - 40) / rows - 10) * .9,
    width: (width - 10) / (cols * 1.25) - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 10,                 // rounded corners
    height: ((height - 40) / rows - 10) * .9,
    width: (width - 10) / (cols * 1.25) - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 23,
    ...defaultStyles.text,
    textAlign: 'center',
  },
});
