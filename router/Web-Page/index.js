import Router from 'express';
import authoraization from '../../middleware/authoraization.js'

const router = Router();

// Public pages
router.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

router.get('/Approvals', authoraization,(req, res) => {
  res.render('Approvals', { pageTitle: 'Approvals' });
});

router.get('/Attendance', authoraization,(req, res) => {
  res.render('Attendance', { pageTitle: 'Attendance' });
});

router.get('/Dashboard',authoraization, (req, res) => {
  res.render('Dashboard', { pageTitle: 'Dashboard' });
});

router.get('/Departments',authoraization, (req, res) => {
  res.render('Departments', { pageTitle: 'Departments' });
});

router.get('/Jobpost', authoraization,(req, res) => {
  res.render('Jobpost', { pageTitle: 'Job Post' });
});

router.get('/Leave_Request',authoraization, (req, res) => {
  res.render('Leave_Request', { pageTitle: 'Leave Request' });
});

router.get('/Login', (req, res) => {
  res.render('Login', { pageTitle: 'Login' });
});

router.get('/Payroll', authoraization,(req, res) => {
  res.render('Payroll', { pageTitle: 'Payroll' });
});

router.get('/Register', authoraization,(req, res) => {
  res.render('Register', { pageTitle: 'Register' });
});

router.get('/Reminders', authoraization,(req, res) => {
  res.render('Reminders', { pageTitle: 'Reminders' });
});

router.get('/Users',authoraization, (req, res) => {
  res.render('Users', { pageTitle: 'Users' });
});

router.get('/viewJobpostData',authoraization,(req, res) => {
  res.render('viewJobpostData', { pageTitle: 'Job Applications' });
});
 //================== Modal Pages =====================
router.get('/Attendance-form',authoraization,(req,res)=>{
  res.render('Attendance-form',{pageTitle:'Attendance Form'});
});

router.get('/branch',authoraization,(req,res)=>{
  res.render('branch',{pageTitle:'Branch Form'});
});

router.get('/Comapny',authoraization,(req,res)=>{
  res.render('Comapny',{pageTitle:'Company Form'});
});

router.get('/department',authoraization,(req,res)=>{
  res.render('department',{pageTitle:'Department Form'});
});

router.get('/designation',authoraization,(req,res)=>{
  res.render('designation',{pageTitle:'Designation Form'});
});

router.get('/leaverequest',authoraization,(req,res)=>{
  res.render('leaverequest',{pageTitle:'Leave Request Form'});
});

router.get('/reporting_manger',authoraization,(req,res)=>{
  res.render('reporting_manger',{pageTitle:'Reporting Manager Form'});
});

router.get('/role',authoraization,(req,res)=>{
  res.render('role',{pageTitle:'Role Form'});
});

export default router;