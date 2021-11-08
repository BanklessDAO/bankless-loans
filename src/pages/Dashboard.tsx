import { Container } from '@chakra-ui/react'

import { Trove } from '../components/Trove/Trove'
import { SystemStats } from '../components/SystemStats'

const Dashboard = (): JSX.Element => {
    return (
        <Container variant='columns'>
            <Container variant='left'>
                <Trove />
            </Container>

            <Container variant='right'>
                <SystemStats />
            </Container>
        </Container>
    )
}

export default Dashboard
