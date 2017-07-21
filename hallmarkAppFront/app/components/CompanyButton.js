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

  // Dynamic styles that depend on state
  getStyles = () => {
    return {
      buttonLabel: (this.props.company.abbreviation === 'Casualty') ? {
        fontSize: 26,
      } : {},
    };
  }

  render() {
    const { company, company: { title, buttonImage, abbreviation }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(this.props.navigation, company)}>
        <View style={styles.imageContainer}>
          {/* <Image source={buttonImage} resizeMode= 'contain' style={styles.image}/> */}
          <Image source={require('../files/images/blank-purple-button.png')} resizeMode= 'contain' style={styles.image}>
            <Text style={[styles.buttonLabel, this.getStyles().buttonLabel]}>{abbreviation}</Text>
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
    minHeight: ((height - 40) / rows - 10) * .9,
    minWidth: (width - 10) / (cols * 1.25) - 10,
  },
  imageContainer: {
    flex: 1,                 // take up all available space
  },
  image: {
    // borderRadius: 10,                 // rounded corners
    height: ((height - 40) / rows - 10) * .9,
    width: (width - 10) / (cols * 1.25) - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 50,
    ...defaultStyles.text,
  },
});
