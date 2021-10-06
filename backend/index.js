import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './authentication/strategy.js';
import { PORT, PAYPAL_CLIENT_ID } from '../config.js';
import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';
import productsController from './controllers/products-controller.js'
import ordersController from './controllers/orders-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import historyController from './controllers/history-controller.js';

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

app.use('/storage/images', express.static('storage/images'));


app.get('/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID));


app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
