import styled from 'styled-components/native';

import theme from '../theme';

const Loader = styled.ActivityIndicator``;

Loader.defaultProps = {
    color: theme.palette.primary,
    size: 'large',
}

export default Loader;
