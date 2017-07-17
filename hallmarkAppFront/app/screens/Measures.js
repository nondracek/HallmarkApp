import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { measureTypes } from '../files/data';
import { defaultStyles } from '../components/style'
import MeasureButton from '../components/MeasureButton'
import MeasurePopUp from '../components/MeasurePopUp'


// Get screen Dimensions
const { width, height } = Dimensions.get('window');

export default class Measures extends Component {
  state = {
    popupIsOpen: false,
  }

  openMeasure = (measure, key) => {
    this.setState({
      popupIsOpen: true,
      measure,
      key,
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
            measureTypes={measure}
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
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});
