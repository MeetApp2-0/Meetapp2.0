import { Router } from 'express';

const routes = new Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/registration', UserController.create);
routes.post('/login', SessionController.create);

export default routes;
