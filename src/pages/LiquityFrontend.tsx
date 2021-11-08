import React from 'react';
import { Flex, Container } from '@chakra-ui/react';
import { Wallet } from '@ethersproject/wallet';

import { Decimal, Difference, Trove } from '@liquity/lib-base';
import { LiquityStoreProvider } from '../components/LiquityStoreProvider';

import { useLiquity } from '../hooks/LiquityContext';
import { TransactionMonitor } from '../components/Transaction';
import { UserAccount } from '../components/UserAccount';
import { SystemStatsPopup } from '../components/SystemStatsPopup';

// import { PageSwitcher } from '../pages/PageSwitcher';
// import { RiskyTrovesPage } from '../pages/RiskyTrovesPage';
// import { RedemptionPage } from '../pages/RedemptionPage';

import { TroveViewProvider } from '../components/Trove/context/TroveViewProvider';

type LiquityFrontendProps = {
  loader?: React.ReactNode;
};
export const LiquityFrontend = ({ loader }: LiquityFrontendProps): JSX.Element => {
  const { account, provider, liquity } = useLiquity();

  // For console tinkering ;-)
  Object.assign(window, {
    account,
    provider,
    liquity,
    Trove,
    Decimal,
    Difference,
    Wallet
  });

  return (
    <LiquityStoreProvider {...{ loader }} store={liquity.store}>
        <TroveViewProvider>
                <Flex sx={{ flexDirection: "column", minHeight: "100%" }}>
                <UserAccount />
                <SystemStatsPopup />

                  <Container
                    variant="main"
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    {/* <Switch>
                      <Route path="/" exact>
                        <PageSwitcher />
                      </Route>
                      <Route path="/farm">
                        <Farm />
                      </Route>
                      <Route path="/risky-troves">
                        <RiskyTrovesPage />
                      </Route>
                      <Route path="/redemption">
                        <RedemptionPage />
                      </Route>
                    </Switch> */}
                  </Container>
                </Flex>
        </TroveViewProvider>
        <TransactionMonitor />
    </LiquityStoreProvider>
  );
};
