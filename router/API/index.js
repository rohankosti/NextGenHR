import {Router} from 'express'

import Attendance from './Attendance.js'
import Authentication from './Authentication.js'
import Brandmodal from './Brandmodal.js'
import Companymodal from './Companymodal.js'
import Departmentmodal from './Departmentmodal.js'
import Designationmodal from './Designationmodal.js'
import jobapplication from './JobApplication.js'
import Leave_requset from './Leave_requset.js'
import Reportingmanager_modal from './Reportingmanager_modal.js'
import Rollmodal from './Rollmodal.js'
import User from './User.js'

const router = Router();

router.use(Attendance)
router.use(Authentication)
router.use(Brandmodal)
router.use(Companymodal)
router.use(Departmentmodal)
router.use(Designationmodal)
router.use(jobapplication)
router.use(Leave_requset)
router.use(Reportingmanager_modal)
router.use(Rollmodal)
router.use(User)

export default router;