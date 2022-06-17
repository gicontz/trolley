import { injectable, inject } from 'inversify';

import NotFoundError from '@errors/NotFoundError';

import {
  INVENTORY_TYPES,
  IInventoryService,
  IInventoryDao,
} from './Inventory.ioc';

import {
  TCreateItemData,
  TGetItemData,
  TGetItemListData,
  TUpdateItemData,
  TDeleteItemData,
} from './Inventory.data';

@injectable()
export default class InventoryService implements IInventoryService {
  private orderDao: IInventoryDao;

  constructor(@inject(INVENTORY_TYPES.iInventoryDao) orderDao: IInventoryDao) {
    this.orderDao = orderDao;
  }

  public createItem = async (data: TCreateItemData) => {
    const order = await this.orderDao.createItem(data);
    return order;
  };

  public getItem = async (data: TGetItemData) => {
    const order = await this.orderDao.getItem(data);
    if (order == null) {
      throw new NotFoundError('EMS data not found.');
    }

    return order;
  };

  public getItemList = async (data: TGetItemListData) => {
    const orderList = await this.orderDao.getItemList(data);

    return orderList;
  };

  public updateItem = async (data: TUpdateItemData) => {
    const { itemId } = data;

    const order = await this.orderDao.getItem({ itemId });
    if (order == null) {
      throw new NotFoundError('Item data not found.');
    }

    await this.orderDao.updateItem(data);
  };

  public deleteItem = async (data: TDeleteItemData) => {
    const { itemId } = data;

    const order = await this.orderDao.getItem({ itemId });
    if (order == null) {
      throw new NotFoundError('Item data not found.');
    }

    await this.orderDao.deleteItem(data);
  };
}
