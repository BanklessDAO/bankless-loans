import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Color overrides.
import colors from './colors';

// Component style overrides.
import Section from './components/section';
import Button from './components/button';
import Link from './components/link';

const overrides = {
    colors,
    styles,
    components: {
        Section,
        Button,
        Link
    }
};

export default extendTheme(overrides);