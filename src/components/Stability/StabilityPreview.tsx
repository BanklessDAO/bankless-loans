import React from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import { WalletConnector } from '../WalletConnector'
import { DisabledEditableRow } from '../Trove/Editor'
import { useModal } from 'hooks/ModalContext'

export const StabilityPreview = (): JSX.Element => {
    const modal = useModal()
    //will need to address hard-coded width for mobile
    return (
        <Flex
            w='555px'
            height='400px'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='100%'
                h='100%'
                maxW='md'
                borderRadius='31px'
                overflow='hidden'
                padding={[10, 34, 34, 5]}
                bg='#131313'
                color='#FFFFFF'
            >
                <Heading>Stability Pool</Heading>

                <DisabledEditableRow
                    label='Deposit'
                    inputID='stake-lqty'
                    amount={'0.000'}
                    unit={'LUSD'}
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
            </Box>
        </Flex>
    )
}
