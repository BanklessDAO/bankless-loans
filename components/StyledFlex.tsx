import { Flex, useStyleConfig } from '@chakra-ui/react';

export default function StyledFlex(props) {

    const { variant, children, ...rest } = props;

    const styles = useStyleConfig("Section", { variant });

    return (
        <Flex __css={styles} {...rest}>
            { children }
        </Flex>
    )
}