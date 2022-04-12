import { Box, Button, HStack } from '@chakra-ui/react'
import { ActionDescriptionV2 } from 'components/ActionDescriptionV2'
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
                <ActionDescriptionV2>
                    {`You have not staked ${GT} yet. Stake ${GT} to earn a share of borrowing and redemption fees.`}
                </ActionDescriptionV2>
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
