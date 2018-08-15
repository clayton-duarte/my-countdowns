import styled from 'styled-components/native';
import { Fab } from 'native-base';

export default styled(Fab)`
background-color: ${props => props.theme.palette.primary};
`;