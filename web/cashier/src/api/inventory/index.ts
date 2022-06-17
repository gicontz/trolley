import React, { useReducer } from 'react';

import { api } from '../../helpers/api';
import { defaultState } from '../../providers/inventory';
import { inventory } from './reducers';
import { Actions, InventoryState, InventoryTypes } from './types';

const initialState: InventoryState = defaultState.invStore;

export type inventoryDispatch = React.Dispatch<InventoryTypes>;

type Dispatcher = {
  inv: React.Dispatch<InventoryTypes>;
};

export const useInventory = (): [InventoryState, React.Dispatch<InventoryTypes>] => {
  const [state, dispatch] = useReducer(inventory, initialState);
  return [state, dispatch];
};

export const getItems = async (dispatch: React.Dispatch<InventoryTypes>): Promise<void> => {
  dispatch({ type: Actions.GET_ITEMS_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/inventory`,
      method: 'get',
    });

    const items = data.records;

    dispatch({ type: Actions.GET_ITEMS_FULFILLED, payload: items });
  } catch (e) {
    dispatch({ type: Actions.GET_ITEMS_REJECTED, payload: undefined });
  }
};
