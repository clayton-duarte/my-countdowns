import styled from 'styled-components/native';

export default styled.TextInput`
font-size: ${props => props.theme.typograph.size};
color: ${props => props.theme.palette.default};
background-color: #DDD;
margin-bottom: 16px;
border-radius: 8px;
padding: 8px 16px;
width: 100%;
`;