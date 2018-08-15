import styled from 'styled-components/native';

import Text from './text';

export default styled(Text)`
font-size: ${props => props.theme.typograph.size * 2};
color: ${props => props.theme.palette.primary};
width: auto;
`;