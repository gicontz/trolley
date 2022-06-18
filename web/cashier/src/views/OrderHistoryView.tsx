import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import OrderHistoryTable from '../layouts/table/OrderHistoryTable';

const Container = styled.div``;

const OrderHistoryView: FunctionComponent<RouteComponentProps> = () => {

  return (
    <Container>
      <h3>Order History</h3>
      <OrderHistoryTable />
    </Container>
  )
};

export default OrderHistoryView;
