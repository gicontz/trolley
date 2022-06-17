import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import { useInventory } from './api/inventory';
import LeftNavbar from './layouts/LeftNavbar';
import InventoryContext from './providers/inventory';
import theme from './styles/theme/themes';

const Root: FunctionComponent = () => {
  const [invStore, invDispatch] = useInventory();

  return (
    <ThemeProvider theme={theme.default}>
      <InventoryContext.Provider value={{ invStore, invDispatch }}>
        <LeftNavbar />
      </InventoryContext.Provider>
    </ThemeProvider>
  );
};

export default Root;
