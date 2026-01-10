import {Router} from 'express';
const AdminBooksRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { AdminAddBook,getAllBooks,getCseBook,getEceBook } from '../Controllers/AdminAddBookController';

AdminBooksRoutes.get("/getAllBooks",verifyToken,verifyAdmin,getAllBooks);
AdminBooksRoutes.post('/addBook',verifyToken,verifyAdmin,AdminAddBook);
AdminBooksRoutes.get("/getCse",verifyToken,verifyAdmin,getCseBook);
AdminBooksRoutes.get('/getEce',verifyToken,verifyAdmin,getEceBook);
export default AdminBooksRoutes;