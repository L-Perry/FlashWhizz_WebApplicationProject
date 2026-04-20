import { Router } from 'express';
import { getHealth } from '../controllers/healthController';

const healthRouter = Router();

healthRouter.get('/', getHealth);

export default healthRouter;
