import {Router} from 'express';
const AdminBooksRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { AdminAddBook } from '../Controllers/AdminAddBookController';

AdminBooksRoutes.post('/addBook',verifyToken,verifyAdmin,AdminAddBook);
export default AdminBooksRoutes;