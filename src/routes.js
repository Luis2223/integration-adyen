import { Router } from 'express';
import SamplePaymentController from './app/controllers/SamplePaymentController';

const routes = new Router();

routes.get('/', SamplePaymentController.index);
routes.post('/', SamplePaymentController.store);

export default routes;
