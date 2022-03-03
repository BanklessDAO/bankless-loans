import { Box } from '@chakra-ui/react'

const StyledBox: React.FC<unknown> = ({ children }) => (
    <Box layerStyle='otherStyle'>{children}</Box>
)

export default StyledBox
