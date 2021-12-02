import React, { useContext } from 'react'
import { Flex } from '@chakra-ui/react'
import StyledBox from '../components/StyledBox'
import BorrowProvider, {
    BorrowContext,
} from '../components/borrow/borrowContext'
import Stepper from '../components/Steps'

const BorrowFormHeader = () => {
    return (
        <StyledBox bg='auto' variant='section' borderRadius='18px'>
            <Flex
                flexDirection='row'
                color='black'
                justifyContent='space-between'
                alignContent='flex-start'
            >
                <div>Borrow LUSD</div>
                <Stepper />
            </Flex>
        </StyledBox>
    )
}

const BorrowForm = () => {
    const { loan } = useContext(BorrowContext)

    return (
        <StyledBox
            h='calc(100vh - 300px)'
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
            p='5'
            w={['100%', '70%']}
            bg='gray'
        >
            <BorrowFormHeader />
            <div>hi, i am a form</div>
        </StyledBox>
    )
}

const BorrowSidebar = () => {
    const { loan } = useContext(BorrowContext)

    return (
        <Flex
            maxHeight='calc(100vh - 305px)'
            height='auto'
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
            w={['100%', '25%']}
            bg='auto'
        >
            <StyledBox bg='white' variant='section' borderRadius='18px'>
                <Flex
                    flexDirection='row'
                    color='black'
                    justifyContent='space-between'
                    alignContent='flex-start'
                >
                    <div>Liquidation Risk</div>
                    <div>LOW</div>
                </Flex>
                <Flex color='black'>
                    The risk that your Trove may become subject to liquidation,
                    taking into account the extra risk of liquidation during
                    recovery mode. Learn More
                </Flex>
            </StyledBox>
            <StyledBox bg='white' color='black' borderRadius='18px'>
                <Flex
                    flexDirection='row'
                    color='black'
                    justifyContent='space-between'
                    alignContent='flex-start'
                >
                    <div>Current Collateralization ratio</div>
                    <div>160%</div>
                </Flex>
            </StyledBox>
            <StyledBox bg='white' color='black' borderRadius='18px'>
                <Flex
                    flexDirection='row'
                    color='black'
                    justifyContent='space-between'
                    alignContent='flex-start'
                >
                    <div>Redemption Risk</div>
                    <div>HIGH</div>
                </Flex>
                <div>The risk that your Trove may be repaid by redeemers</div>
                <div>Learn more</div>
            </StyledBox>
        </Flex>
    )
}

const BorrowCreate = (): JSX.Element => (
    <BorrowProvider loan={''}>
        <Flex h='100%' direction='row'>
            <BorrowForm />
            <BorrowSidebar />
        </Flex>
    </BorrowProvider>
)

export default BorrowCreate
