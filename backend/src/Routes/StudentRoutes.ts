import { Router } from "express";
const studentRoutes=Router();
import verifyToken from "../middleware/verifyToken";
import verifyAdmin from "../middleware/verifyAdmin";
import { getAllStudent,makeStudent,checkStudent} from "../Controllers/StudentController";
import verifyStudent from "../middleware/verifyStudent";

studentRoutes.get('/getAllAttendence',verifyToken,verifyAdmin,getAllStudent);
studentRoutes.get('/checkStudent',verifyToken,verifyStudent,checkStudent);
studentRoutes.post('/makeStudent',verifyToken,verifyStudent,makeStudent);
export default studentRoutes;