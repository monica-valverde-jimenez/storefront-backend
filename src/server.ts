import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import categoryRoutes from './handlers/categories';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import orderProductRoutes from './handlers/orderProducts';
import dashboardRoutes from './handlers/dashboard';

export const app = express();

const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to store online API');
});

categoryRoutes(app);
productRoutes(app);
userRoutes(app);
orderRoutes(app);
orderProductRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
