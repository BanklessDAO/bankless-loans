import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });

// Global style overrides
import styles from './styles';

// Font overrides.
import fonts from './fonts';

// Color overrides.
import colors from './colors';

// Component style overrides.
import Section from './components/section';
import Button from './components/button';
import Link from './components/link';
import Text from './components/text';
import Heading from './components/heading';
import Popover from './components/popover';
import Checkbox from './components/checkbox';

 const customTheme = extendTheme({
    colors,
    styles,
    fonts,
    components: {
      Section
    }
    // components: {
    //     Section,
    //     Button,
    //     Link,
    //     Text,
    //     Heading,
    //     Popover,
    //     Checkbox
    // }
});

// export default extendTheme(overrides);

export default customTheme
