import {Router} from 'express';
const bookIssueRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { bookIssue } from '../Controllers/BookIssueController';

bookIssueRoutes.post("/bookIssue",verifyToken,verifyStudent,bookIssue);

export default bookIssueRoutes;