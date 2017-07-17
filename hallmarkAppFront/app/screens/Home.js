import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    Button
} from 'react-native';

import {defaultStyles} from '../components/style'
import Background from '../components/Background'
import {ButtonImage} from '../components/Buttons'

const Companies = {
    comp1: "Comp1",
    comp2: "Comp2",
    comp3: "Comp3",
    comp4: "Comp4",
}
const numCompany = 4;


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Businesses',
    headerStyle: defaultStyles.header,
    headersTintColor: 'green'
  };



    render() {
        const { navigate } = this.props.navigation;
        var buttons = [];
        for (let i = 1; i <= numCompany; i++){
            buttons.push(
                <ButtonImage key={i}>
                    <Text onPress={() => navigate('Details', {name: Companies['comp'+i]})}>
                        {Companies['comp'+i]}
                    </Text>
                </ButtonImage>
            )
        }


        return (
          <Background>
              {buttons}
          </Background>
        )
    };
}

export default HomeScreen
