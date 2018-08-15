import { createStackNavigator } from 'react-navigation';
import { ThemeProvider } from 'styled-components';
import React, { Component } from 'react';
import 'moment/locale/pt-br';

import SetupScreen from './screens/setup';
import InitScreen from './screens/init';
import HomeScreen from './screens/home';
import defaultTheme from './theme';

const StackNavigator = createStackNavigator({
  Setup: SetupScreen,
  Init: InitScreen,
  Home: HomeScreen,
},{
  initialRouteName: 'Init',
});

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <StackNavigator/>
      </ThemeProvider>
    );
  }
}