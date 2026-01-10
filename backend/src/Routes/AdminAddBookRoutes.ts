import {Router} from 'express';
const AdminBooksRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { AdminAddBook,getAllBooks,getCseBook,getEceBook,handleDelete,handleStudent} from '../Controllers/AdminAddBookController';
import verifyStudent from '../middleware/verifyStudent';

AdminBooksRoutes.get("/getAllBooks",verifyToken,verifyAdmin,getAllBooks);
AdminBooksRoutes.post('/addBook',verifyToken,verifyAdmin,AdminAddBook);
AdminBooksRoutes.get("/getCse",verifyToken,verifyAdmin,getCseBook);
AdminBooksRoutes.get('/getEce',verifyToken,verifyAdmin,getEceBook);
AdminBooksRoutes.post("/handleDelete",verifyToken,verifyAdmin,handleDelete);
AdminBooksRoutes.post("/handleBooks",verifyToken,verifyStudent,handleStudent);
export default AdminBooksRoutes;