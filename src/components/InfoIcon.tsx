import React from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import { Icon } from './Icon'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { roundArrow } from 'tippy.js'
import 'tippy.js/dist/svg-arrow.css'
import { color } from '@chakra-ui/styled-system'
export type InfoIconProps = Pick<TippyProps, 'placement'> &
    Pick<FontAwesomeIconProps, 'size'> & {
        tooltip: React.ReactNode
    }

export const InfoIcon: React.FC<InfoIconProps> = ({
    placement = 'right',
    tooltip,
    size = '1x',
}) => {
    return (
        <Tippy
            className='tippy-popper'
            interactive={true}
            placement={placement}
            content={tooltip}
            arrow={roundArrow}
        >
            <span>
                &nbsp;
                <Icon name='question-circle' size={size} />
            </span>
        </Tippy>
    )
}
