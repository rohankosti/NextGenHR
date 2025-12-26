import {
  Attendancepost,
  GetAttandance,
  singledata,
  updateddata,
  delateddata,
} from '../../controller/Attendance.js'
import express from 'express';
const router =express.Router();

router.post('/Attendancedata',Attendancepost);
router.get('/getattendancedata',GetAttandance);
router.post('/getsingalattendancedata',singledata);
router.put('/updatedattandancedata/:id',updateddata);
router.delete('/deletedataattandance/:id',delateddata);
export default router;
