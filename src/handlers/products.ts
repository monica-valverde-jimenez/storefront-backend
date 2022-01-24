import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../utils/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.productId);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: Product = {
      category_id: req.body.categoryId,
      name: req.body.name,
      price: req.body.price
    };
    const result = await store.create(data);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
    return;
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const data: Product = {
      id: req.body.id,
      category_id: req.body.categoryId,
      name: req.body.name,
      price: req.body.price
    };
    const result = await store.update(data);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
    return;
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.body.id);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
    return;
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:productId', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products', update);
  app.delete('/products', destroy);
};

export default productRoutes;
