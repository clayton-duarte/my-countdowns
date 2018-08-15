import { withNavigationFocus } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import 'moment/locale/pt-br';
import React from 'react';

import Loader from '../components/loader';
import View from '../components/view';

class InitScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
        display: 'none',
    }
  }

  constructor(props){
    super(props);
    this.findStoredData = async () => {
      const data = await AsyncStorage.getItem('objective');
      return data;
    }
    this.navigationController = async () => {
      if(this.props.isFocused) {
        const data = await this.findStoredData();
        this.props.navigation.navigate(data ? 'Home': 'Setup');
      }
    }
  }

  componentDidMount(){
    this.navigationController();
  }

  componentDidUpdate(){
    this.navigationController();
  }
  
  render() {
    return (
      <View>
        <Loader/>
      </View>
    );
  }
}

export default withNavigationFocus(InitScreen);