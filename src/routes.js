import { Router } from 'express';
import SamplePaymentController from './app/controllers/SamplePaymentController';
import TokenRegisterController from './app/controllers/TokenRegisterController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

routes.get('/', SamplePaymentController.index);
routes.post('/', SamplePaymentController.store);

routes.post('/token', TokenRegisterController.store);

routes.post('/subscription', SubscriptionController.store);

export default routes;
