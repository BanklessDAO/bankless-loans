import React from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import { WalletConnector } from '../WalletConnector'
import { DisabledEditableRow } from '../Trove/Editor'
import { useModal } from 'hooks/ModalContext'
import { CardBase } from '../Layout/CardBase'

export const StakingPreview = (): JSX.Element => {
    //will need to address hard-coded width for mobile
    const modal = useModal()

    return (
        <CardBase>
            <Heading>LQTY Staking</Heading>

            <DisabledEditableRow
                label='Stake'
                inputID='stake-lqty'
                amount={'0.000'}
                unit={'LQTY'}
            />

            <Box ml='10px' w='full' h='100px'>
                <h3>Please connect your wallet to use our services</h3>
                <br />
                <WalletConnector
                    isOpen={modal.isModalOpen}
                    onOpen={modal.openModal}
                    onClose={modal.closeModal}
                />
            </Box>
        </CardBase>
    )
}
