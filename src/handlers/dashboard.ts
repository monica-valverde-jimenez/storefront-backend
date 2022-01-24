import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';
import verifyAuthToken from '../utils/verifyAuthToken';

const dashboard = new DashboardQueries();

const productsbyCat = async (req: Request, res: Response) => {
  const products = await dashboard.productsByCategory(req.params.categoryId);
  res.json(products);
};

const getPopularProducts = async (req: Request, res: Response) => {
  const products = await dashboard.getTopFiveProducts(req.params.status);
  res.json(products);
};

const getCompleteOrder = async (req: Request, res: Response) => {
  const products = await dashboard.ordersByUser(req.params.userId, 'complete');
  res.json(products);
};

const getActiveOrder = async (req: Request, res: Response) => {
  const products = await dashboard.ordersByUser(req.params.userId, 'active');
  res.json(products);
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products/list/product/:categoryId', productsbyCat);
  app.get('/products/list/popular/:status', getPopularProducts);
  app.get(
    '/products/list/order/complete/:userId',
    verifyAuthToken,
    getCompleteOrder
  );
  app.get(
    '/products/list/order/active/:userId',
    verifyAuthToken,
    getActiveOrder
  );
};

export default dashboardRoutes;
