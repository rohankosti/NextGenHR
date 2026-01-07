import {
  Attendancepost,
  GetAttendance,
  singledata,
  updateddata,
  delateddata,

} from '../../controller/Attendance.js'
import express from 'express';
const router =express.Router();

router.post('/Attendancedata',Attendancepost);
router.get('/getattendancedata',GetAttendance);
router.post('/getsingalattendancedata',singledata);
router.put('/updatedattandancedata/:id',updateddata);
router.delete('/deletedataattandance/:id',delateddata);

export default router;
