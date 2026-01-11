import {Router} from 'express';
const approvedRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { approveRequest } from '../Controllers/ApprovedController';


approvedRoutes.post('/Approved',verifyToken,verifyAdmin,approveRequest);

export default approvedRoutes;