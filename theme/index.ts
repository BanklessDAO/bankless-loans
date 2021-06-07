import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Color overrides.
import colors from './colors';

// Component style overrides.
import Box from './components/box';
import Button from './components/button';

const overrides = {
    colors,
    styles,
    components: {
        Box,
        Button
    }
};

export default extendTheme(overrides);