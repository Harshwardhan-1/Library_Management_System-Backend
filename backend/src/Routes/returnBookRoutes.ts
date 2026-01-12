import {Router} from 'express';
const returnBookRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';


import { succReturn,deleteIt,paidFine } from '../Controllers/ReturnBookController';

returnBookRoutes.post('/succReturn',verifyToken,verifyAdmin,succReturn);
returnBookRoutes.post('/deleteIt',verifyToken,verifyAdmin,deleteIt);
returnBookRoutes.post('/paidFine',verifyToken,verifyAdmin,paidFine);

export default returnBookRoutes;