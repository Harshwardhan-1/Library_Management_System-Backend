import {Router} from 'express';
const approveRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';


import { approveIt,deleteRequest } from '../Controllers/ApproveController';
approveRoutes.post('/approveRequest',verifyToken,verifyAdmin,approveIt);
approveRoutes.post('/deleteRequest',verifyToken,verifyAdmin,deleteRequest)

export default approveRoutes;