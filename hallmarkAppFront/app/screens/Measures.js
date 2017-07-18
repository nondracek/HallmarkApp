import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { measureTypes } from '../files/data';
import { defaultStyles } from '../components/style'
import MeasureButton from '../components/MeasureButton'
import MeasurePopUp from '../components/MeasurePopUp'
import companyTitle from './Companies'


// Get screen Dimensions
const { width, height } = Dimensions.get('window');

export default class Measures extends Component {
  comp = "hello"

  static navigationOptions = ({navigation}) => {
    return {
      title: `${navigation.state.params.title}`
    }
  }

  state = {
    popupIsOpen: false,
  }

  openMeasure = (measure, key) => {
    this.setState({
      popupIsOpen: true,
      measure,
    });
  }

  closeMeasure = () => {
    this.setState({
      popupIsOpen: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
    		  // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {measureTypes.map((measure, index) => <MeasureButton
            measure={measure}
            onOpen={this.openMeasure}
            key={index}
          />)}
        </ScrollView>
        <MeasurePopUp
          onSwipe={this.openMeasure}
          measure={this.state.measure}
          measureID = {this.state.key}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMeasure}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});
