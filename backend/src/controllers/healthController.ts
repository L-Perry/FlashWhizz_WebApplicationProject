import { Request, Response } from 'express';
import { getHealthStatus } from '../models/healthModel';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json(getHealthStatus());
};
