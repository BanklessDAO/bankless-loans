import { useState } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { EditableRow } from './Editor'
import {
  Decimal,
} from "@liquity/lib-base";

export const Opening = (): JSX.Element => {
    const editingState = useState<string>();
    const [collateral, setCollateral] = useState<Decimal>(Decimal.ZERO);
    const [borrowAmount, setBorrowAmount] = useState<Decimal>(Decimal.ZERO);
    return (
        <Box
            h="calc(100vh - 300px)"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            p="5"
            w={["100%", "70%"]}
            bg="gray"
        >
            <EditableRow
                label='collateral'
                inputID="amount-lp"
                amount=''
                unit=''
                editedAmount=''
                editingState={editingState}
                maxAmount=''
                setEditedAmount={(amount: string) => setCollateral(Decimal.from(amount))}
            />

            <EditableRow
                label='borrow'
                inputID="amount-lp"
                amount=''
                unit=''
                editedAmount=''
                editingState={editingState}
                maxAmount=''
                setEditedAmount={(amount: string) => setCollateral(Decimal.from(amount))}
            />
            <Flex>
                <Button variant="cancel">
                Cancel
                </Button>

                <Button>Confirm</Button>
            </Flex>
        </Box>
    )
}
