import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { defaultStyles } from '../components/style'
import MeasureButton from '../components/MeasureButton'
import MeasurePopUp from '../components/MeasurePopUp'
import companyTitle from './Companies'
import measureButtons from '../files/data'



// Get screen Dimensions
const { width, height } = Dimensions.get('window');

@connect(
  state => ({
    measureTypes: state.measureTypes,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MOVIE_DATA'}),
  }),
)

export default class Measures extends Component {

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
    const { measureTypes, loading, refresh } = this.props;
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
      >
        <View
          style={styles.buttonContent}
        >
          {measureTypes.map((measure, index) => <MeasureButton
            measure={measure}
            onOpen={this.openMeasure}
            imgNum={measureTypes.indexOf(measure)}
            key={index}
          />)}
        </View>
        <MeasurePopUp
          onSwipe={this.openMeasure}
          measure={this.state.measure}
          measureID = {this.state.key}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMeasure}
          measureTypes={measureTypes}
        />
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: .05*(height - 50),         // start below status bar
  },
  buttonContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
    justifyContent: 'center',
    paddingTop: .05*(height - 50),
    height: height,
  },
});
