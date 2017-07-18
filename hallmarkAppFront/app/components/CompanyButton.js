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
import { companies } from '../files/data'

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 4;

export default class CompanyButton extends Component {

  // Dynamic to create a space for logo on packground
  getStyles = () => {
   return {
     IDFour: (companies.indexOf(this.props.company) === 3) ? {
       marginRight: (width - 10) / cols,
     } : {},
    };
  }



  // Component prop types
  static propTypes = {
    // Measure Object
    company: PropTypes.object.isRequired,
    // Called when user taps on measure button
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const { company, company: { title, buttonImage, abbreviation }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(this.props.navigation, company)}>
        <View style={styles.imageContainer}>
          <Image source={buttonImage} resizeMode= 'contain' style={styles.image}/>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    paddingLeft: width/20,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 10,                 // rounded corners
    height: (height - 20 - 20) / rows - 40,
    width: (width - 10) / cols - 40,
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
