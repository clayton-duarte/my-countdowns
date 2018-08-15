import styled from 'styled-components/native';
import React from 'react';

const Text = styled.Text`
font-size: ${props => props.theme.typograph.size};
text-align: center;
color: white;
`;

const ButtonWrapper = styled.TouchableHighlight`
background-color: ${props => props.theme.palette.primary};
border-radius: 8px;
padding: 8px 16px;
width: 100%;
`;

export default props => (
    <ButtonWrapper>
        <Text {...props}/>
    </ButtonWrapper>
);