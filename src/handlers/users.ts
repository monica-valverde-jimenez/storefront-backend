import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../utils/verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      username: req.body.username
    };
    const result = await store.create(data);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const data: User = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      username: req.body.username
    };
    const result = await store.update(data);
    res.json(result);
  } catch (error) {
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

const authenticate = async (req: Request, res: Response) => {
  try {
    const result = await store.authenticate(
      req.body.username,
      req.body.password
    );
    const token = jwt.sign(
      { username: result?.username },
      process.env.TOKEN_SECRET || ''
    );
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
  app.put('/users', verifyAuthToken, update);
  app.delete('/users', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};

export default productRoutes;
