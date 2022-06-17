import { Action } from '../../types/Misc';

export enum Actions {
  GET_ITEMS_START = '@cashier/GET_ITEMS_START',
  GET_ITEMS_REJECTED = '@cashier/GET_ITEMS_REJECTED',
  GET_ITEMS_FULFILLED = '@cashier/GET_ITEMS_FULFILLED',
}

export type TItemCategory =
  | 'canned-goods'
  | 'frozen-food'
  | 'essentials'
  | 'apparel'
  | 'meat'
  | 'vegetable'
  | 'fruit'
  | 'electronics'
  | 'hygiene';

export const ITEM_CATEGORIES: TItemCategory[] = [
  'apparel',
  'canned-goods',
  'electronics',
  'essentials',
  'fruit',
  'hygiene',
  'meat',
  'vegetable',
  'frozen-food',
];

export interface IItem {
  itemId: string;
  category: TItemCategory;
  qty: number;
  name: string;
  productCode: string;
  price: string;
  description: string;
}

export interface WithIsLoading<T> {
  record: T;
  isLoading: boolean;
}

export interface InventoryState {
  itemList: WithIsLoading<IItem[]>;
}

export type TGetAllItemsRequest = Action<typeof Actions.GET_ITEMS_START>;
type TGetAllItemsAction = Action<typeof Actions.GET_ITEMS_FULFILLED, IItem[]>;
type TGetAllItemsError = Action<typeof Actions.GET_ITEMS_REJECTED>;

export type InventoryTypes = TGetAllItemsRequest | TGetAllItemsAction | TGetAllItemsError;
