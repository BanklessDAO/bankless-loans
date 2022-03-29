import { Heading, Box, Flex, Button } from '@chakra-ui/react'
import { GT } from '../../strings'
import { InfoMessage } from '../InfoMessage'
import { CardBase } from '../Layout/CardBase'
import { useStakingView } from './context/StakingViewContext'

export const NoStake: React.FC = () => {
    const { dispatch } = useStakingView()

    return (
        <CardBase>
            <Heading>Staking</Heading>
            <Box sx={{ p: [2, 3] }}>
                <InfoMessage title={`You have not staked ${GT} yet.`}>
                    Stake {GT} to earn a share of borrowing and redemption fees.
                </InfoMessage>
                <Flex>
                    <Button
                        variant='mainPurple'
                        onClick={() => dispatch({ type: 'startAdjusting' })}
                    >
                        Start staking
                    </Button>
                </Flex>
            </Box>
        </CardBase>
    )
}
