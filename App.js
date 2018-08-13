import styled from 'styled-components/native';
import 'moment/locale/pt-br';
import moment from 'moment';
import React from 'react';

import theme from './theme';

const Loader = styled.ActivityIndicator``;

Loader.defaultProps = {
  color: theme.palette.primary,
  size: 'large',
}

const View = styled.View`
background-color: ${theme.palette.background};
justify-content: center;
align-items: center;
height: 100%;
`;

const Number = styled.Text`
font-size: ${theme.typograph.size * 4};
color: ${theme.palette.primary};
`;

const Text = styled.Text`
font-size: ${theme.typograph.size};
color: ${theme.palette.default};
`;

const SubText = styled.Text`
font-size: ${theme.typograph.size * .75};
color: ${theme.palette.secondary};
`

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.getNumber = message => message.replace(/[A-z]+/g, '');
    this.tikTak = () => {
      const endOfMonth = moment().endOf('month').format();
      const plus5days = moment(endOfMonth).add(this.props.payday, 'days').format();
      this.setState({
        day: moment().format('LL'),
        time: moment().format('LTS'),
        countdown: this.getNumber(moment(plus5days).fromNow()),
      });
    }
    this.startClock = () => {
      this.setState({ clock: setInterval(this.tikTak, 1000)});
    }
    this.stopClock = () => {
      clearInterval(this.state.clock);
    }
  }
  
  componentDidMount() {
    moment.locale('pt-br');
    this.startClock();
  }

  componentWillUnmount() {
    this.stopClock();
  }

  render() {
    if(!this.state.countdown) return <View><Loader/></View>;
    return (
      <View>
        <Number>{this.state.countdown}</Number>
        <SubText>dias para receber</SubText>
      </View>
    );
  }
}

App.defaultProps = {
  payday: 5,
  theme
}