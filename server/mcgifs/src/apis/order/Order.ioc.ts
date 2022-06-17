import { Router, Request, Response, NextFunction } from 'express';

import {
  IOrder,
  TCreateOrderData,
  TGetOrderData,
  TGetOrderListData,
  TUpdateOrderData,
  TDeleteOrderData,
} from './Order.data';

export const ORDER_TYPES = {
  iOrderRouter: Symbol.for('IOrderRouter'),
  iOrderValidator: Symbol.for('IOrderValidator'),
  iOrderController: Symbol.for('IOrderController'),
  iOrderService: Symbol.for('IOrderService'),
  iOrderDao: Symbol.for('IOrderDao'),
};

export interface IOrderRouter {
  path: string;
  router: Router;
}

export interface IOrderValidator {
  createOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  getOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getOrderList: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  updateOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  deleteOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export interface IOrderController {
  createOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  getOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getOrderList: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  updateOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  deleteOrder: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export interface IOrderService {
  createOrder: (data: TCreateOrderData) => Promise<IOrder>;
  getOrder: (data: TGetOrderData) => Promise<IOrder>;
  getOrderList: (data: TGetOrderListData) => Promise<IOrder[]>;
  updateOrder: (data: TUpdateOrderData) => Promise<void>;
  deleteOrder: (data: TDeleteOrderData) => Promise<void>;
}

export interface IOrderDao {
  createOrder: (data: TCreateOrderData) => Promise<IOrder>;
  getOrder: (data: TGetOrderData) => Promise<IOrder | null>;
  getOrderList: (data: TGetOrderListData) => Promise<IOrder[]>;
  updateOrder: (data: TUpdateOrderData) => Promise<void>;
  deleteOrder: (data: TDeleteOrderData) => Promise<void>;
}
