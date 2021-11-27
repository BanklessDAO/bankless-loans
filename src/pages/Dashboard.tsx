import { Grid, Box } from '@chakra-ui/react'

import { Trove } from '../components/Trove/Trove'
import { SystemStats } from '../components/SystemStats'

const Dashboard = (): JSX.Element => {
    return (
        <Grid display='flex' flexDirection={{ base: 'column', lg: 'row' }}>
            <Box>
                <Trove />
            </Box>

            <Box>
                <SystemStats />
            </Box>
        </Grid>
    )
}

export default Dashboard
