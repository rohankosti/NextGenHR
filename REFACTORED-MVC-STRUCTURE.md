# NextGenHR - Refactored MVC Structure

## Overview
All controllers in the `controller/` folder have been refactored to follow a modern Express.js MVC pattern matching the `JobApplication.js` controller design. Controllers now:
- Use Mongoose models for database operations
- Export individual async functions with `(req, res)` signatures
- Return early with proper HTTP status codes
- Include try-catch error handling
- Use `export { functionName }` (named exports)

All routers have been updated to import and use these controller functions.

---

## Refactored Controllers

### 1. **Authentication.js**
**Model:** `Register.js`

**Exported Functions:**
- `login` - POST authentication with email & password

**Router:** `router/API/Authentication.js`
```javascript
router.post("/logindata", login);
```

---

### 2. **Attendance.js** ✓ (Already MVC-compliant)
**Model:** `Attandance.js`

**Exported Functions:**
- `Attendancepost` - POST attendance record
- `GetAttandance` - GET all attendance records
- `singledata` - GET single attendance by ID
- `updateddata` - PUT/update attendance
- `delateddata` - DELETE attendance

**Router:** `router/API/Attendance.js` (Updated to use controllers)

---

### 3. **Brandmodal.js** (Branch Management)
**Model:** `Branch.js`

**Exported Functions:**
- `createBranch` - POST create branch
- `getBranches` - GET all branches
- `branchesByCompany` - GET branches filtered by company name

**Router:** `router/API/Brandmodal.js`
```javascript
router.post("/branchdata", createBranch);
router.get("/getbranchdata", getBranches);
router.get("/getCompanyWiseBranch", branchesByCompany);
```

---

### 4. **Companymodal.js**
**Model:** `Company.js`

**Exported Functions:**
- `createCompany` - POST create company
- `getCompanies` - GET all companies

**Router:** `router/API/Companymodal.js`
```javascript
router.post("/getcomapnydata", createCompany);
router.get("/getcomapnydata", getCompanies);
```

---

### 5. **Departmentmodal.js**
**Model:** `Department.js`

**Exported Functions:**
- `createDepartment` - POST create department
- `getDepartments` - GET all departments
- `getDepartmentById` - GET single department by ID
- `updateDepartment` - PUT/update department
- `deleteDepartment` - DELETE department

**Router:** `router/API/Departmentmodal.js`
```javascript
router.post("/departmentdataapi", createDepartment);
router.get("/getdepartmentdata", getDepartments);
router.put("/Updateddata/:id", updateDepartment);
router.delete("/Deletedata/:id", deleteDepartment);
```

---

### 6. **Designationmodal.js**
**Model:** `Designation.js`

**Exported Functions:**
- `createDesignation` - POST create designation
- `getDesignations` - GET all designations

**Router:** `router/API/Designationmodal.js`
```javascript
router.post("/designationdataapi", createDesignation);
router.get("/getdesignationdata", getDesignations);
```

---

### 7. **JobApplication.js** ✓ (Reference Pattern)
**Model:** `jobpost.js`

**Exported Functions:**
- `storejobvecancy` - POST create job vacancy
- `jobvecancylist` - GET all job vacancies
- `jobvecancysingledata` - GET single job vacancy
- `updatejobapplicationdata` - PUT/update job vacancy
- `deletejobapplicationdata` - DELETE job vacancy

**Router:** `router/API/JobApplication.js`
```javascript
router.post('/storeJobVacancy', storejobvecancy);
router.get('/jobvecancylist', jobvecancylist);
router.post('/jobvecancysingledata', jobvecancysingledata);
router.put('/updatejobapplicationdata/:id', updatejobapplicationdata);
router.delete('/deletejobapplicationdata/:id', deletejobapplicationdata);
```

---

### 8. **Leave_requset.js**
**Model:** `LeaveRequest.js`

**Exported Functions:**
- `createLeaveRequest` - POST create leave request
- `getLeaveRequests` - GET all leave requests
- `getLeaveRequestById` - GET single leave request by ID
- `updateLeaveRequest` - PUT/update leave request
- `deleteLeaveRequest` - DELETE leave request

**Router:** `router/API/Leave_requset.js`
```javascript
router.post("/leaverequest", createLeaveRequest);
router.get("/getleaverequest", getLeaveRequests);
router.put("/updatedleaverequest/:id", updateLeaveRequest);
router.delete("/delateleaverequest/:id", deleteLeaveRequest);
```

---

### 9. **Register.js** (Employee Registration)
**Model:** `Register.js`

**Exported Functions:**
- `createEmployee` - POST create employee
- `getLastEmployee` - GET last employee added
- `getEmployees` - GET all employees
- `getEmployeeById` - GET single employee by ID
- `updateEmployee` - PUT/update employee
- `deleteEmployee` - DELETE employee

**Router:** `router/API/Register.js`
```javascript
router.post("/storeEmployee", createEmployee);
router.get("/lastemployedata", getLastEmployee);
router.get("/getregisterdata", getEmployees);
router.put("/updateduserdashboard/:id", updateEmployee);
router.delete("/deleteuserdashboard/:id", deleteEmployee);
```

---

### 10. **Reportingmanager_modal.js**
**Model:** `reporting_manger.js`

**Exported Functions:**
- `createReportingManager` - POST create reporting manager
- `getReportingManagers` - GET all reporting managers

**Router:** `router/API/Reportingmanager_modal.js`
```javascript
router.post("/reportingmanagerapi", createReportingManager);
router.get("/getreportingmanager", getReportingManagers);
```

---

### 11. **Rollmodal.js** (Role Management)
**Model:** `Role.js`

**Exported Functions:**
- `createRole` - POST create role
- `getRoles` - GET all roles

**Router:** `router/API/Rollmodal.js`
```javascript
router.post("/roledata", createRole);
router.get("/getroledata", getRoles);
```

---

## Key Changes Made

### Controller Pattern (Before → After)

**Before (Raw HTTP API):**
```javascript
const login = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const parse = JSON.parse(body);
    const user = await dbs.collection("Register").findOne({ email: parse.email });
    if (user) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(user));
    }
  });
};

export default { login };
```

**After (Express + Mongoose):**
```javascript
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (password === user.password) {
      return res.status(200).json(user);
    }
    return res.status(401).json({ message: "Invalid Password" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { login };
```

### Router Pattern (Before → After)

**Before:**
```javascript
const client = new MongoClient(process.env.MONGO_URL);
const dbs = client.db(dbs_name);

router.post("/logindata", async (req, res) => {
  // Inline logic
});
```

**After:**
```javascript
import { login } from "../../controller/Authentication.js";
import express from "express";

const router = express.Router();
router.post("/logindata", login);

export default router;
```

---

## Benefits of This Refactoring

✅ **Clean Separation of Concerns** - Controllers handle business logic, routers handle routing  
✅ **Mongoose ORM** - Type-safe database operations with schema validation  
✅ **Consistent Error Handling** - All controllers use try-catch blocks  
✅ **Express-Standard** - Follows Express.js best practices  
✅ **Named Exports** - Easier to import and understand which functions are available  
✅ **No Manual JSON Parsing** - Express middleware handles `req.body` automatically  
✅ **Better HTTP Status Codes** - Proper status codes for success/failure scenarios  
✅ **Scalability** - Easier to add middleware, validation, and authentication  

---

## Next Steps

1. **Middleware Integration** - Add authentication middleware to protected routes
2. **Input Validation** - Use libraries like `joi` or `express-validator`
3. **API Documentation** - Add Swagger/OpenAPI documentation
4. **Testing** - Add unit and integration tests
5. **Error Logging** - Implement centralized error logging
6. **Rate Limiting** - Add rate limiting for API endpoints

---

## File Structure Summary

```
controller/
├── Attendance.js          ✓ (Already MVC)
├── Authentication.js      ✓ (Refactored)
├── Brandmodal.js         ✓ (Refactored)
├── Companymodal.js       ✓ (Refactored)
├── Departmentmodal.js    ✓ (Refactored)
├── Designationmodal.js   ✓ (Refactored)
├── JobApplication.js     ✓ (Reference)
├── Leave_requset.js      ✓ (Refactored)
├── Register.js           ✓ (Refactored)
├── Reportingmanager_modal.js ✓ (Refactored)
└── Rollmodal.js          ✓ (Refactored)

router/API/
├── Attendance.js         ✓ (Updated)
├── Authentication.js     ✓ (Updated)
├── Brandmodal.js        ✓ (Updated)
├── Companymodal.js      ✓ (Updated)
├── Departmentmodal.js   ✓ (Updated)
├── Designationmodal.js  ✓ (Updated)
├── JobApplication.js    ✓ (Reference)
├── Leave_requset.js     ✓ (Updated)
├── Register.js          ✓ (Updated)
├── Reportingmanager_modal.js ✓ (Updated)
└── Rollmodal.js         ✓ (Updated)
```

---

## Testing the Refactored Controllers

To test the refactored endpoints, ensure:
1. MongoDB is running and connected
2. All Mongoose models are properly defined in `/Model`
3. Routers are mounted in your main `server.js` file
4. Use Postman or similar tool to test the endpoints

Example POST request:
```
POST /api/logindata
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

**Refactoring completed on:** December 26, 2025  
**Status:** ✓ All controllers converted to MVC pattern  
**Pattern Reference:** `JobApplication.js`
