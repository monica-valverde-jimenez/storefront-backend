import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index();
  res.json(categories);
};

const show = async (_req: Request, res: Response) => {
  const categories = await store.index();
  res.json(categories);
};

const create = async (req: Request, res: Response) => {
  try {
    const category: Category = {
      name: req.body.name
    };
    const categories = await store.create(category);
    res.json(categories);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const category: Category = {
      id: req.body.id,
      name: req.body.name
    };
    const categories = await store.update(category);
    res.json(categories);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const categoryRoutes = (app: express.Application) => {
  app.get('/categories', index);
  app.get('/categories/:id', show);
  app.post('/categories', create);
  app.put('/categories', update);
  app.delete('/categories', destroy);
};

export default categoryRoutes;
