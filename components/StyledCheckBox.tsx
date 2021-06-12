import { Checkbox, useStyleConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

// TODO: Need to figure out typing props for React

type Props = {
    defaultChecked?: boolean,
    isDisabled?: boolean,
    children?: ReactNode,
}

export default function StyledCheckbox(props: Props) {

    const { 
        children, 
        isDisabled,
        defaultChecked, 
        ...rest
    } = props;

    let bColor = !props.isDisabled ? "interactive.dark": "transparent";
    let bgColor = !props.isDisabled ? "transparent": "interactive.grey";
    
    let customCheckBoxStyles = {
        ".chakra-checkbox__control": {
            borderColor: bColor,
            bg: bgColor
        },
        ".chakra-checkbox__control[data-hover]": {
            borderColor: "interactive.purple"
        },
        ".chakra-checkbox__control[data-checked]": {
            borderColor: "rgba(0,0,0,0)",
            background: "supplementary.green"
        },
        ".chakra-checkbox__control[data-disabled]": {
            "pointer-events": "none",
            bg: "interactive.grey",
            border: "none",
            borderColor: "rgba(0,0,0,0)"
        }
    }

    return (
        <Checkbox
            isDisabled={ isDisabled }
            sx={ customCheckBoxStyles }
            { ...rest }>
                { children }
        </Checkbox>
    )
}