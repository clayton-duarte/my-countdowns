import { withNavigationFocus } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Icon } from 'native-base';
import 'moment/locale/pt-br';
import moment from 'moment';
import React from 'react';

import SubText from '../components/subtext';
import Loader from '../components/loader';
import Number from '../components/number';
import View from '../components/view';
import Fab from '../components/fab';

class HomeScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        }
    }

    constructor(props){
        super(props);
        this.state = {};
        // DATA METHODS
        this.findStoredData = async () => {
            const data = await AsyncStorage.multiGet(['objective', 'offset']);
            return data;
        };
        this.mapDataToState = async () => {
            if(this.props.isFocused) {
                const data = await this.findStoredData();
                const [[x, objective], [y, offset]] = data;
                this.setState({ objective, offset: offset - 1 });
            }
        };
        this.setStartDate = () => {
            const startOfMonth = moment().startOf('month').format();
            const thisMonth = moment(startOfMonth).add(this.state.offset, 'days').format();
            const today = moment().format();
            const endOfMonth = moment().endOf('month').format();
            const nextMonth = moment(endOfMonth).add(this.state.offset, 'days').format();
            if(today < thisMonth) return thisMonth;
            else return nextMonth;
        }
        // TIME METHODS
        this.tikTak = () => {
            const startDate = this.setStartDate();
            const dateFromNow = moment(startDate).fromNow();
            const message = dateFromNow.includes('há') ? 'hoje' : dateFromNow;
            this.setState({
                day: moment().format('LL'),
                time: moment().format('LTS'),
                countdown: message,
            });
        };
        this.startClock = () => {
            this.setState({ clock: setInterval(this.tikTak, 1000)});
        };
        this.stopClock = () => {
            clearInterval(this.state.clock);
        };
        // EVENT METHODS
        this.handleOnPress = () => this.props.navigation.navigate('Setup');
    }

    componentDidMount() {
        this.mapDataToState();
        moment.locale('pt-br');
        this.startClock();
    }

    componentDidUpdate() {
        this.mapDataToState();
    }

    componentWillUnmount() {
        this.stopClock();
    }

    render() {
        if(!this.state.countdown) return <View><Loader/></View>;
        return (
            <View>
                {/* HEADER */}

                {/* CONTENT */}
                <SubText center>Dia do {this.state.objective}</SubText>
                <Number center>{this.state.countdown}</Number>
                {/* FOOTER */}
                <Fab onPress={this.handleOnPress}><Icon name='cog'/></Fab>
            </View>
        );
    }
}

export default withNavigationFocus(HomeScreen);