import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../utils/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.json(result);
};

const show = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.json(result);
};

const create = async (req: Request, res: Response) => {
  try {
    const data: Order = {
      userId: req.body.userId,
      status: req.body.status
    };
    const result = await store.create(data);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const data: Order = {
      id: req.body.id,
      userId: req.body.userId,
      status: req.body.status
    };
    const result = await store.update(data);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.body.id);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders', verifyAuthToken, update);
  app.delete('/orders', verifyAuthToken, destroy);
};

export default orderRoutes;
