import Router from 'express';

const router = Router();

// Public pages
router.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

router.get('/Approvals', (req, res) => {
  res.render('Approvals', { pageTitle: 'Approvals' });
});

router.get('/Attendance', (req, res) => {
  res.render('Attendance', { pageTitle: 'Attendance' });
});

router.get('/Dashboard', (req, res) => {
  res.render('Dashboard', { pageTitle: 'Dashboard' });
});

router.get('/Departments', (req, res) => {
  res.render('Departments', { pageTitle: 'Departments' });
});

router.get('/Jobpost', (req, res) => {
  res.render('Jobpost', { pageTitle: 'Job Post' });
});

router.get('/Leave_Request', (req, res) => {
  res.render('Leave_Request', { pageTitle: 'Leave Request' });
});

router.get('/Login', (req, res) => {
  res.render('Login', { pageTitle: 'Login' });
});

router.get('/Payroll', (req, res) => {
  res.render('Payroll', { pageTitle: 'Payroll' });
});

router.get('/Register', (req, res) => {
  res.render('Register', { pageTitle: 'Register' });
});

router.get('/Reminders', (req, res) => {
  res.render('Reminders', { pageTitle: 'Reminders' });
});

router.get('/Users', (req, res) => {
  res.render('Users', { pageTitle: 'Users' });
});

router.get('/viewJobpostData', (req, res) => {
  res.render('viewJobpostData', { pageTitle: 'Job Applications' });
});
 //================== Modal Pages =====================
router.get('/Attendance-form',(req,res)=>{
  res.render('Modal_Page/Attendance-form',{pageTitle:'Attendance Form'});
});

router.get('/branch',(req,res)=>{
  res.render('branch',{pageTitle:'Branch Form'});
});

router.get('/Comapny',(req,res)=>{
  res.render('Comapny',{pageTitle:'Company Form'});
});

router.get('/department',(req,res)=>{
  res.render('Modal_Page/department',{pageTitle:'Department Form'});
});

router.get('/designation',(req,res)=>{
  res.render('designation',{pageTitle:'Designation Form'});
});

router.get('/leaverequest',(req,res)=>{
  res.render('Modal_Page/leaverequest',{pageTitle:'Leave Request Form'});
});

router.get('/reporting_manger',(req,res)=>{
  res.render('reporting_manger',{pageTitle:'Reporting Manager Form'});
});

router.get('/role',(req,res)=>{
  res.render('role',{pageTitle:'Role Form'});
});
export default router;