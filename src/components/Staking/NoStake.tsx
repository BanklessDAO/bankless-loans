import { Heading, Box, Flex, Button } from '@chakra-ui/react'
import { GT } from '../../strings'
import { InfoMessage } from '../InfoMessage'
import { useStakingView } from './context/StakingViewContext'

export const NoStake: React.FC = () => {
    const { dispatch } = useStakingView()

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Heading>Staking</Heading>
            <Box sx={{ p: [2, 3] }}>
                <InfoMessage title={`You have not staked ${GT} yet.`}>
                    Stake {GT} to earn a share of borrowing and redemption fees.
                </InfoMessage>
                <Flex variant='layout.actions'>
                    <Button
                        onClick={() => dispatch({ type: 'startAdjusting' })}
                    >
                        Start staking
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}
