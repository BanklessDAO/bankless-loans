import { Grid, Box } from '@chakra-ui/react'
import { Trove } from '../components/Trove/Trove'

const Dashboard = (): JSX.Element => {
    return (
        <Grid display='flex' flexDirection={{ base: 'column', lg: 'row' }}>
            <Box>
                <Trove />
            </Box>
        </Grid>
    )
}

export default Dashboard
