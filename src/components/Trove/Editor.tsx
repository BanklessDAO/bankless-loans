import { useState } from "react";
import { Flex, Input } from '@chakra-ui/react'
import { EditableRowProps } from 'TroveType'


export const EditableRow = ({
  inputID,
  amount,
  editingState,
  setEditedAmount
}: EditableRowProps): JSX.Element => {
    const [editing, setEditing] = editingState;
    const [invalid, setInvalid] = useState(false);

    return (
        <Flex flexDirection='row'
            color='black'
            justifyContent="center"
            alignContent='center'
            >
            <Input
                size='md'
                label='currency'
                autoFocus
                id={inputID}
                type="number"
                step="any"
                defaultValue={amount}
                variant="editor"
                onChange={e => {
                    try {
                        setEditedAmount(e.target.value);
                        setInvalid(false);
                    } catch {
                        setInvalid(true);
                    }
                }} />
        </Flex>
    )
}
