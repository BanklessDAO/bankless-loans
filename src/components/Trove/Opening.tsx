import { Flex, Button } from '@chakra-ui/react'
import StyledBox from '../Layout/StyledBox'
import { EditableRow } from './Editor'

export const Opening = (): JSX.Element => {
  return (
    <StyledBox
      h="calc(100vh - 300px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      p="5"
      w={["100%", "70%"]}
      bg="gray"
    >
      <EditableRow
          placeholder="Collateral"
          inputId="amount-lp"
          amount=''
          unit=''
          editingState=''
          editedAmount=''
          setEditedAmount=''
          maxAmount=''
          maxedOut=''
        //   setEditedAmount={(amount: string) => setCollateral(Decimal.from(amount))}
        />

        <EditableRow
          placeholder="Borrow"
          inputId="amount-lp"
          amount=''
          unit=''
          editingState=''
          editedAmount=''
          setEditedAmount=''
          maxAmount=''
          maxedOut=''
        //   setEditedAmount={(amount: string) => setCollateral(Decimal.from(amount))}
        />
        <Flex>
            <Button variant="cancel">
            Cancel
            </Button>

            <Button>Confirm</Button>
        </Flex>
    </StyledBox>
  )
}
