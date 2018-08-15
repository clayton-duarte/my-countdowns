import styled from 'styled-components/native';

import Text from './text';

export default styled(Text)`
font-size: ${props => props.theme.typograph.size * .75};
color: ${props => props.theme.palette.secondary};
`