import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';
import productsController from './controllers/products-controller.js';
import ordersController from './controllers/orders-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import historyController from './controllers/history-controller.js';
import wishListController from './controllers/wish-list-controller.js';
import questionsController from './controllers/questions-controller.js';
import answersController from './controllers/answers-controller.js';

import jwtStrategy from './authentication/strategy.js';
import { PORT, PAYPAL_CLIENT_ID } from '../config.js';
import HttpException from './models/HttpException.js';

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
app.use('/reviews', reviewsController);
app.use('/history', historyController);
app.use('/wishlist', wishListController);
app.use('/questions', questionsController);
app.use('/answers', answersController);

app.use('/storage/images', express.static('storage/images'));
app.use('/storage/avatars', express.static('storage/avatars'));

app.get('/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID));

app.all('*', (req, res) => res.status(404).send({ message: 'Resource not found!' }));

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
