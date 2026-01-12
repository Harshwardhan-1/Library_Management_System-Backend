import {Router} from 'express';
const fineStudents=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';

import { allFineStudents } from '../Controllers/FineStudentController';

fineStudents.get('/allFine',verifyToken,verifyAdmin,allFineStudents);


export default fineStudents;