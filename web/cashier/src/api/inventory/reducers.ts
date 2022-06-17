import { Actions, InventoryState, InventoryTypes } from './types';

export function inventory(state: InventoryState, action: InventoryTypes): InventoryState {
  switch (action.type) {
    case Actions.GET_ITEMS_START: {
      return {
        ...state,
        itemList: {
          record: [],
          isLoading: true,
        },
      };
    }
    case Actions.GET_ITEMS_FULFILLED: {
      return {
        ...state,
        itemList: {
          record: action.payload,
          isLoading: false,
        },
      };
    }
    case Actions.GET_ITEMS_REJECTED: {
      return {
        ...state,
        itemList: {
          record: [],
          isLoading: false,
        },
      };
    }
    default:
      return state;
  }
}
