import { Box, Button, HStack } from '@chakra-ui/react'
import { ActionDescription } from 'components/ActionDescription'
import { HeadingBase } from 'components/HeadingBase'
import { GT } from '../../strings'
import { CardBase } from '../Layout/CardBase'
import { useStakingView } from './context/StakingViewContext'

export const NoStake: React.FC = () => {
    const { dispatch } = useStakingView()

    return (
        <CardBase>
            <HeadingBase>Staking</HeadingBase>
            <Box>
                <ActionDescription>
                    {`You have not staked ${GT} yet. Stake ${GT} to earn a share of borrowing and redemption fees.`}
                </ActionDescription>
                <HStack>
                    <Button
                        variant='mainPurple'
                        onClick={() => dispatch({ type: 'startAdjusting' })}
                        m={0}
                    >
                        Start staking
                    </Button>
                </HStack>
            </Box>
        </CardBase>
    )
}
