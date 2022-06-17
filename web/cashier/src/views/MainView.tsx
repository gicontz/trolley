import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { APP_PATHS } from '../constants/paths';
import LeftNavbar from '../layouts/LeftNavbar';
import CashierView from './CashierView';
import InventoryView from './InventoryView';
import OrderHistoryView from './OrderHistoryView';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const AppContent = styled.div`
  margin-left: 50px;
  width: 100%;
  padding: 20px 50px 20px 0;
  box-sizing: bordered-box;
`;

const MainView: FunctionComponent = () => {

  return (
    <AppContainer>
      <LeftNavbar />
      <AppContent>
        <Router>
          <InventoryView path={APP_PATHS.INVENTORY} />
          <CashierView path={APP_PATHS.CASHIER} />
          <OrderHistoryView path={APP_PATHS.ORDER_HISTORY} />
        </Router>
      </AppContent>
    </AppContainer>
  )
};

export default MainView;
