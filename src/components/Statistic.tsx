import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { InfoIcon } from './InfoIcon';

type StatisticProps = {
  name: React.ReactNode;
  tooltip?: React.ReactNode;
};

export const Statistic: React.FC<StatisticProps> = ({ name, tooltip, children }) => {
  return (
    <Flex sx={{ borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1.2, fontWeight: 200 }}>
        <Flex>{name}</Flex>
        {tooltip && <InfoIcon size='xs' tooltip={<Box variant='tooltip'>{tooltip}</Box>} />}
      </Flex>
      <Flex sx={{ justifyContent: 'flex-start', flex: 0.8, alignItems: 'center' }}>{children}</Flex>
    </Flex>
  );
};
