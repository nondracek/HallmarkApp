import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { companies } from '../files/data';
import { defaultStyles } from '../components/style'
import CompanyButton from '../components/CompanyButton'
import Background from '../components/Background'
import LinearGradient from 'react-native-linear-gradient';

// Get screen Dimensions
const { width, height } = Dimensions.get('window');

export var companyTitle = "hello"

export default class Companies extends Component {

    static navigationOptions = {
      title: 'Companies',
    }

  toMeasures = (navigate, company) => {
    navigate('Measures', {title: company.abbreviation})
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
        >
      {/* <View style={styles.container}> */}
        {/* <ScrollView style={styles.container}
            contentContainerStyle={styles.scrollContent}
      		  // Hide all scroll indicators
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          > */}
            {companies.map((company, index) => <CompanyButton
              company={company}
              onOpen={this.toMeasures}
              key={index}
              navigation = {navigate}
            />)}
        {/* </ScrollView> */}
      {/* </View> */}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: .04*(height - 50),         // start below status bar
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
    justifyContent: 'center',
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
    justifyContent: 'center',
  },
});
