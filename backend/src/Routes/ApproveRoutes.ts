import {Router} from 'express';
const approveRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';


import { approveIt } from '../Controllers/ApproveController';
approveRoutes.post('/approveRequest',verifyToken,verifyAdmin,approveIt);


export default approveRoutes;