import styled from 'styled-components/native';

export default styled.Text`
text-align: ${props => props.center ? 'center' : 'left'};
font-size: ${props => props.theme.typograph.size};
color: ${props => props.theme.palette.default};
width: 100%;
`;