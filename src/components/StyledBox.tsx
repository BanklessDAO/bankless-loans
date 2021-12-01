import { Box, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    variant?: string;
    children?: ReactNode;
    color?: string;
    bg?: string;
    borderRadius?: string;
    h?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    p?: string;
    w?: string | string[];
    rounded?: string;
    mt?: string;
};

export default function StyledBox({ variant, children }: Props): JSX.Element {
    const styles = useStyleConfig('Section', { variant });

    return <Box __css={styles}>{children}</Box>;
}
