import {Router} from 'express';
const returnBookRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';


import { succReturn } from '../Controllers/ReturnBookController';

returnBookRoutes.post('/succReturn',verifyToken,verifyAdmin,succReturn);

export default returnBookRoutes;