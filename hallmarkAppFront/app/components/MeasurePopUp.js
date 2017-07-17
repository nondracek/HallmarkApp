import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { defaultStyles } from './style';
import { measureTypes } from '../files/data'

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MeasurePopUp extends Component {

  static propTypes = {
	  isOpen: PropTypes.bool.isRequired,
    // Movie object that has title, genre, poster, days and times
    measure: PropTypes.object,
    // Gets called when user books their ticket
    onBook: PropTypes.func,
    // Gets called when popup closed
    onClose: PropTypes.func,
  }

  state = {
    // Animates slide ups and downs when popup open or closed
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // Backdrop opacity
    opacity: new Animated.Value(0),
    // Popup height that can be changed by pulling it up or down
    height: defaultHeight,
    // Expanded mode with bigger poster flag
    expanded: false,
    // Visibility flag
    visible: this.props.isOpen,
  };

  // When user starts pulling popup previous height gets stored here
  // to help us calculate new height value during and after pulling
  _previousHeight = 0
  _previousWidth = 0

  componentWillMount() {
    // Initialize PanResponder to handle move gestures
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Ignore taps
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        // Store previous height before user changed it
        this._previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Pull delta and velocity values for y axis from gestureState
        const { dy, vy, dx } = gestureState;
        // Subtract delta y from previous height to get new height
        let newHeight = this._previousHeight - dy;


        // Animate heigh change so it looks smooth
        LayoutAnimation.easeInEaseOut();

        // If there's a left or right swipe, ignore up or down motion
        if (dx < width / 4) {

          // Switch to expanded mode if popup pulled up above 80% mark
          if (newHeight > height - height / 5) {
            this.setState({ expanded: true });
          } else {
            this.setState({ expanded: false });
          }

          // Expand to full height if pulled up rapidly
          if (vy < -0.75) {
            this.setState({
              expanded: true,
              height: height
            });
          }

          // Close if pulled down rapidly
          else if (vy > 0.75) {
            this.props.onClose();
          }
          // Close if pulled below 75% mark of default height
          else if (newHeight < defaultHeight * 0.75) {
            this.props.onClose();
          }
          // Limit max height to screen height
          else if (newHeight > height) {
            this.setState({ height: height });
          }
          else {
            this.setState({ height: newHeight });
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy, dx, vx  } = gestureState;
        const newHeight = this._previousHeight - dy;


        let newWidth = this._previousWidth - dx

        let measureID = measureTypes.indexOf(this.props.measure)

        // navigate to different measure if swiped left or right
        if (dx > width / 4 && measureID != measureTypes.length) {
          this.props.onSwipe(measureTypes[measureID + 1]);
        }
        if (dx < - width / 4 && measureID != 0) {
          this.props.onSwipe(measureTypes[measureID - 1])
        }

        // Close if pulled below default height
        if (newHeight < defaultHeight && Math.abs(dx) < width / 4) {
          this.props.onClose();
          this.setState({
            key: this.state.key - 1,
          })
        }

        // Update previous height
        this._previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  // Handle isOpen changes to either open or close popup
  componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed to false from true
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      Animated.parallel([
        // Animate opacity
        Animated.timing(
          this.state.opacity, { toValue: 0.5 } // semi-transparent
        ),
        // And slide up
        Animated.timing(
          this.state.position, { toValue: 0 } // top of the screen
        ),
      ]).start();
    });
  }

  // Close popup
  animateClose() {
    Animated.parallel([
      // Animate opacity
      Animated.timing(
        this.state.opacity, { toValue: 0 } // transparent
      ),
      // Slide down
      Animated.timing(
        this.state.position, { toValue: height } // bottom of the screen
      ),
    ]).start(() => this.setState({
      // Reset to default values
      height: defaultHeight,
      expanded: false,
      visible: false,
    }));
  }

  // Dynamic styles that depend on state
  getStyles = () => {
    return {
      imageContainer: this.state.expanded ? {
        width: width / 2,         // half of screen widtj
      } : {
        maxWidth: 110,            // limit width
        marginRight: 10,
      },
      movieContainer: this.state.expanded ? {
        flexDirection: 'column',  // arrange image and movie info in a column
        alignItems: 'flex-start',     // and center them
      } : {
        flexDirection: 'row',     // arrange image and movie info in a row
      },
      title: this.state.expanded ? {
        textAlign: 'left',
      } : {},
    };
  }


  render() {
    const {
      measure,
      onBook
    } = this.props;
    // Pull out movie data
    const { title } = measure || {};
    // Render nothing if not visible
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        {/* Closes popup if user taps on semi-transparent backdrop */}
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            // Animates height
            height: this.state.height,
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >

          {/* Content */}
          <View style={styles.content}>
            <View>
              {/* Measure */}
              <Text style={styles.sectionHeader}>{title}</Text>
            </View>
            {/* Movie poster, title and genre */}
            <View
              style={[styles.movieContainer, this.getStyles().movieContainer]}
              {...this._panResponder.panHandlers}
            >
              {/* MTD YTD */}
              <View style={styles.movieInfo}>
                <Text style={[styles.title, this.getStyles().title]}>MTD:</Text>
                <Text style={[styles.title, this.getStyles().title]}>YTD:</Text>
              </View>
            </View>

            {/* Showtimes */}


          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={onBook}
            >
              <Text style={styles.button}>Book My Tickets</Text>
            </TouchableHighlight>
          </View>

        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
  },
  // Popup
  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // Movie container
  movieContainer: {
    flex: 1,                            // take up all available space
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,                            // take up all available space
  },
  image: {
    borderRadius: 10,                   // rounded corners
    ...StyleSheet.absoluteFillObject,   // fill up all space in a container
  },
  movieInfo: {
    backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,

  },
  title: {
    ...defaultStyles.text,
    fontSize: 20,
    paddingLeft: width / 5,
    paddingTop: height / 10,

  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // Footer
  footer: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
});
