import {Router} from 'express';
const bookIssueRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import verifyAdmin from '../middleware/verifyAdmin';

import { bookIssue,getAllIssue } from '../Controllers/BookIssueController';

bookIssueRoutes.get("/allRequest",verifyToken,verifyAdmin,getAllIssue);
bookIssueRoutes.post("/bookRequest",verifyToken,verifyStudent,bookIssue);

export default bookIssueRoutes;