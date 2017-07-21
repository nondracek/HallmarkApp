import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Button,
  AlertIOS,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import FingerprintScanner from 'react-native-fingerprint-scanner';


import { companies } from '../files/data';
import { defaultStyles } from '../components/style'
import CompanyButton from '../components/CompanyButton'
import Background from '../components/Background'
import LinearGradient from 'react-native-linear-gradient';

// Get screen Dimensions
const { width, height } = Dimensions.get('window');


export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  static navigationOptions = {
    title: 'LogIn',
    header: null,
  }

  pinCheck = (navRoute) => {
    if (this.state.text === '1234') {
      this.props.navigation.dispatch(navRoute);
    }
    else alert('incorrect pin')
  }

  FingerScanAttempt = (callback) => {
    if (Platform.OS === 'ios') {
      FingerprintScanner
        .isSensorAvailable()
        .then(result => {
          FingerprintScanner
          .authenticate(
            { description: 'Scan your fingerprint on the device scanner to continue',
            fallbackEnabled: true}
          )
          .then(() => {
            // this.props.handlePopupDismissed();
            // AlertIOS.alert('Authenticated successfully');
            callback();
          })
          .catch((error) => {
            // this.props.handlePopupDismissed();
            AlertIOS.alert("Could not read fingerprint");
          });
        })
        .catch((error) => {
          AlertIOS.alert(error.message);
        })

    }
    else if (Platform.OS === 'android') {

    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
    NavigationActions.navigate({ routeName: 'Companies'}),
  ]
})

    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoCorrect= {false}
            caretHidden= {true}
            keyboardType= 'numeric'
            maxLength= {4}
            placeholder= '4-Digit PIN'
            secureTextEntry= {true}
            autoFocus= {true}
          />
            <TouchableOpacity
              onPress={() => this.pinCheck(resetAction)}
              style={styles.buttons}
              >
              <View>
                <Image
                  source={require('../files/images/long-purple-button.png')}
                  resizeMode= 'contain' style={styles.image}
                  style={styles.buttonImage}
                >
                  <Text style={styles.buttonLabel}>Submit</Text>
                </Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.FingerScanAttempt(() => this.props.navigation.dispatch(resetAction))}
              style={styles.buttons}
              >
              <View>
                <Image
                  source={require('../files/images/long-purple-button.png')}
                  resizeMode= 'contain' style={styles.image}
                  style={styles.buttonImage}
                >
                  <Text style={styles.buttonLabel}>Touch ID</Text>
                </Image>
              </View>
            </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: .04*(height - 50),         // start below status bar
    flexDirection: 'column',   // arrange posters in rows
    // flexWrap: 'wrap',       // allow multiple rows
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    marginTop: height / 5,
    height: height/10,
    width: width/2,
    backgroundColor: '#D2D2F5',
    borderRadius: 10,
    borderColor: '#7F007F',
    borderWidth: 2,
    textAlign: 'center',
  },
  buttons: {
    height: height/15,
    width: width/2,
    marginTop: height/30,
  },
  buttonImage: {
    height: height/15,
    width: width/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 35,
    ...defaultStyles.text,
  },
});
