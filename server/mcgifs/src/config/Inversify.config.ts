import 'reflect-metadata';

import { Container } from 'inversify';

import swaggerBind from './inversify/Swagger.config';
import emsBind from './inversify/Inventory.config';

const iocContainer = new Container();
swaggerBind(iocContainer);
emsBind(iocContainer);

export default iocContainer;
