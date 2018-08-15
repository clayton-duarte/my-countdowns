import { withNavigationFocus } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import 'moment/locale/pt-br';
import React from 'react';

import SubText from '../components/subtext';
import Button from '../components/button';
import Input from '../components/input';
import View from '../components/view';
import Text from '../components/text';

class SetupScreen extends React.PureComponent {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        }
    }

    constructor(props){
        super(props);
        this.state = {};
        this.findStoredData = async () => {
            const data = await AsyncStorage.multiGet(['objective', 'offset']);
            return data;
        };
        this.mapDataToState = async () => {
            if(this.props.isFocused) {
                const data = await this.findStoredData();
                const [[x, objective], [y, offset]] = data;
                this.setState({ objective, offset });
            }
        };
        this.mapStateToData = async state => {
            const { objective, offset } = state;
            await AsyncStorage.multiSet([['objective', objective], ['offset', offset]]);
            this.props.navigation.goBack();
        }
        this.handleOnPress = () => {
            this.mapStateToData(this.state);
        }
    }

    componentDidMount() {
        this.mapDataToState();
    }

    componentDidupdate() {
        this.mapDataToState();
    }

    render() {
        return (
            <View>
                {/* HEADER */}
                <Text>Configurações:</Text>
                {/* CONTENT */}
                <SubText>Qual o nome do evento que está aguardando?</SubText>
                <Input placeholder='Objetivo' value={this.state.objective} onChangeText={objective => this.setState({ objective })}/>
                <SubText>Que dia do mês ele acontererá?</SubText>
                <Input placeholder='Dia do Mês' value={this.state.offset} onChangeText={offset => this.setState({ offset })}/>
                {/* FOOTER */}
                <Button onPress={this.handleOnPress}>Salvar</Button>
            </View>
        );
    }
}

export default withNavigationFocus(SetupScreen);