import {Router} from 'express';
const issuedRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';

import { createIssued,allIssued } from '../Controllers/IssuedBookController';

issuedRoutes.get('/allIssued',verifyToken,verifyAdmin,allIssued);
issuedRoutes.post('/create',verifyToken,verifyAdmin,createIssued);

export default issuedRoutes;