import { Container } from '@chakra-ui/react'

const StyledContainer: React.FC<unknown> = ({ children }) => (
    <Container layerStyles='otherStyle'>{children}</Container>
)

export default StyledContainer
