import {Router} from 'express';
const returnBookRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';


import { succReturn,deleteIt } from '../Controllers/ReturnBookController';

returnBookRoutes.post('/succReturn',verifyToken,verifyAdmin,succReturn);
returnBookRoutes.post('/deleteIt',verifyToken,verifyAdmin,deleteIt);
export default returnBookRoutes;