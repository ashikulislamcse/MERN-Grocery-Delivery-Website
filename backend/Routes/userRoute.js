import express from 'express';
import { Login, Logout, Register } from '../Controllers/userControllers.js';




const Router = express.Router();

Router.post('/register', Register);
Router.post('/login', Login);
Router.get('/logout', Logout);


export default Router;