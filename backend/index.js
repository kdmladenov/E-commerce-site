import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './authentication/strategy.js';
import { PORT } from '../config.js';
import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';
import productsController from './controllers/products-controller.js'
import ordersController from './controllers/orders-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authController);
app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);
app.use('/storage/avatars', express.static('storage/avatars'));
app.use('/storage/images', express.static('storage/images'));

app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
