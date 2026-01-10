import {Router} from 'express';
const bookIssueRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { bookIssue } from '../Controllers/BookIssueController';

bookIssueRoutes.post("/bookRequest",verifyToken,verifyStudent,bookIssue);

export default bookIssueRoutes;