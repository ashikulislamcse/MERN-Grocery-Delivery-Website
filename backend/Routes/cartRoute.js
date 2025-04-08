import express from 'express';
import isAuthenticated from '../Middlewares/isAuthenticated.js';
import { updateCart } from '../Controllers/cartController.js';



const Router = express.Router();

Router.post('/update', isAuthenticated, updateCart);


export default Router;