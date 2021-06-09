import { Box, useStyleConfig } from '@chakra-ui/react';

export default function StyledBox(props) {

    const { variant, children, ...rest } = props;

    const styles = useStyleConfig("Section", { variant });

    return (
        <Box __css={styles} {...rest}>
            { children }
        </Box>
    )
}