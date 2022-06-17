import { createContext } from 'react';

import { InventoryState, InventoryTypes } from '../api/inventory/types';

export const defaultState = {
  invStore: {
    itemList: {
      record: [],
      isLoading: false,
    },
  } as InventoryState,
  invDispatch: (inv: InventoryTypes): void => {},
};

export default createContext(defaultState);
