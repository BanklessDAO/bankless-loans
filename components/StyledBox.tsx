import { Box, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    variant?: string,
    children?: ReactNode,
}

export default function StyledBox({variant, children, ...rest}: Props) {
    const styles = useStyleConfig("Section", { variant });

    return (
        <Box __css={styles} {...rest}>
            { children }
        </Box>
    )
}
