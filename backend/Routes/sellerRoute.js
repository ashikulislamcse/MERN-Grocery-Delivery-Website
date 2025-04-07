import express from 'express';
import { isSellerAuth, LogoutSeller, sellerLogin } from '../Controllers/sellerController.js';
import authSeller from '../Middlewares/authSeller.js';


const Router = express.Router();

Router.post('/login', sellerLogin);
Router.get('/is-auth',authSeller, isSellerAuth);
Router.get('/logout', LogoutSeller);



export default Router;