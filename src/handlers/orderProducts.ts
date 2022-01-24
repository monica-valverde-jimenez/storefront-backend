import express, { Request, Response } from 'express';
import { OrderProduct, OrderProductStore } from '../models/orderProduct';
import verifyAuthToken from '../utils/verifyAuthToken';

const store = new OrderProductStore();

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.showOrderProduct(req.params.orderId);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: OrderProduct = {
      orderId: req.body.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity
    };
    const result = await store.addNewProduct(data);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.deleteOrderProduct(
      req.body.orderId,
      req.body.productId
    );
    res.json(result);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const orderProductRoutes = (app: express.Application) => {
  app.get('/orders/products/:orderId', verifyAuthToken, show);
  app.post('/orders/product', verifyAuthToken, create);
  app.delete('/orders/product', verifyAuthToken, destroy);
};

export default orderProductRoutes;
