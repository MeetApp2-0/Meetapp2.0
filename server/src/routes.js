import { Router } from 'express';

const routes = new Router();

const UserController = require('./app/controllers/UserController');

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/registration', UserController.create);

export default routes;
