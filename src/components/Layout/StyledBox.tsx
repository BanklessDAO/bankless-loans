import { Box, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    variant?: string,
    children?: ReactNode,
}

const StyledBox = ({variant, children, ...rest}: Props): JSX.Element => {
    const styles = useStyleConfig("Section", { variant });

    return (
        <Box __css={styles} {...rest}>
            { children }
        </Box>
    )
}

export default StyledBox
