import express from 'express';
import { isAuth, Login, Logout, Register } from '../Controllers/userControllers.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';




const Router = express.Router();

Router.post('/register', Register);
Router.post('/login', Login);
Router.get('/logout',isAuthenticated, Logout);
Router.get('/is-auth',isAuthenticated, isAuth);




export default Router;