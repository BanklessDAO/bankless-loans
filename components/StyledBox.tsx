import { Box, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

// TODO: Need to figure out typing props for React

// type Props {
//     variant?: string,
//     children?: ReactNode,
// }

export default function StyledBox(props: any) {


    const { variant, children, ...rest } = props;

    const styles = useStyleConfig("Section", { variant });

    return (
        <Box __css={styles} {...rest}>
            { children }
        </Box>
    )
}