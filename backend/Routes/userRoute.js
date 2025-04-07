import express from 'express';
import { Login, Register } from '../Controllers/userControllers.js';




const Router = express.Router();

Router.post('/register', Register);
Router.post('/login', Login);



export default Router;