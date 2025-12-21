import http from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import { json } from "stream/consumers";
import jobApplication from "./API/JobApplication.js";
import registermodal from "./API/Register.js";
import comapnymodal from "./API/Companymodal.js";
import branchmodal from "./API/Brandmodal.js";
import departmentModal from "./API/Departmentmodal.js";
import designationmodal from "./API/Designationmodal.js";
import reportingmanager from "./API/Reportingmanager_modal.js";
import rolemodal from "./API/Rollmodal.js";
import logindata from "./API/Authentication.js";
import leaverequest from "./API/Leave_requset.js";
import Attendance from "./API/Attendance.js";
import { URLSearchParams } from "url";
import dotenv from "dotenv";
dotenv.config();
import express from "express";

const client = new MongoClient(process.env.MONGO_URL);
const dbs_name = process.env.MONGO_DB;

client
  .connect()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDb Server Not Connected ! Error", err);
  });

const dbs = client.db(dbs_name);

const app = express();
app.use(express.static("WEB"));

//1:API to store jobpost.html form vacancy data and save in Mongodb database
app.post("/storeJobVacancy", (req, res) => {
  jobApplication.storejobvecancy(req, res, dbs);
});

const server = http.createServer((req, res) => {
  // Frontend localhost:5500 or file:// se backend localhost:3000 ko call kar raha hai → Browser ise allowed nahi karega.
  // Backend se response aayega hi nahi.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //   Browser POST request bhejne se pehle ek check karta hai:
  //   "OPTIONS request (preflight) — server allow karta hai ya nahi?"
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
//1:API to store jobpost.html form vacancy data and save in Mongodb database
 if (req.method === "POST" && req.url === "/storeJobVacancy") {
   jobApplication.storejobvecancy(req, res, dbs);
 }
//2:API to fetch all job vacancy data ans show in table in viewJobpostData.html
if (req.method === "GET" && req.url === "/jobvecancylist") {
  jobApplication.jobvecancylist(req, res, dbs);
}

//3:API to fetch single job vacancy data and show in modal in viewJobpostData.html
if (req.method === "POST" && req.url === "/jobvecancysingledata") {
  jobApplication.jobvecancysingledata(req, res, dbs);
}

//4:API to update job vacancy data from modal in viewJobpostData.html
if (req.method === "PUT" && req.url === "/updatejobapplicationdata") {
  jobApplication.updatejobapplicationdata(req, res, dbs);
}

//5:API to delete job vacancy data from viewJobpostData.html
if (req.method === "DELETE" && req.url === "/deletejobapplicationdata") {
  jobApplication.deletejobapplicationdata(req, res, dbs);
}

//6:API to fetch Register.html form data and save in Mongodb database
if (req.method === "POST" && req.url === "/storeEmployee") {
  registermodal.registerdata(req, res, dbs);
}
//API use for Auto Generated register.html Comapny code and save mongodb
if (req.method === "GET" && req.url === "/lastemployedata") {
  registermodal.lastemploye(req, res, dbs);
}

//user dasboard API
//API for GET Register.html data and fetch in leave request form get user name and id
if (req.method === "GET" && req.url === "/getregisterdata") {
  registermodal.getregiterdata(req, res, dbs);
}
//API for GET Register.html data and fetch in leave request form get user name and id
if (req.method === "POST" && req.url === "/singleuserdashboard") {
  registermodal.singleuserdashboard(req, res, dbs);
}
//API for GET Register.html updated
if (req.method === "PUT" && req.url === "/updateduserdashboard") {
  registermodal.updateduserdashboard(req, res, dbs);
}
//API for GET Register.html delete
if (req.method === "DELETE" && req.url === "/deleteuserdashboard") {
  registermodal.deleteuserdashboard(req, res, dbs);
}

//API use for login Authentication
if (req.method === "POST" && req.url === "/logindata") {
  logindata.login(req, res, dbs);
}
// Leave requset API
if (req.method === "POST" && req.url === "/leaverequest") {
  leaverequest.leavereq(req, res, dbs);
}
//API use for get leave request data for crud
if (req.method === "GET" && req.url === "/getleaverequest") {
  leaverequest.getleavereq(req, res, dbs);
}
//API for fetch single leave requset data and
if (req.method === "POST" && req.url === "/singleleaverequest") {
  leaverequest.singleleaverequest(req, res, dbs);
}
//API for fetch Updated leave request data
if (req.method === "PUT" && req.url === "/updatedleaverequest") {
  leaverequest.updatedleave(req, res, dbs);
}
//API for fetch Updated leave request data
if (req.method === "DELETE" && req.url === "/delateleaverequest") {
  leaverequest.delateleaverequest(req, res, dbs);
}

// ======================***********MODAL**********====================
//1: Comapany Data Fetch From Comapny.html file
if (req.method === "POST" && req.url === "/companydata") {
  comapnymodal.comapnyModalAPI(req, res, dbs);
}

//1.1: GET Company Data Modal API
if (req.method === "GET" && req.url === "/getcomapnydata") {
  comapnymodal.getComapnyDataAPI(req, res, dbs);
}

//2: Branch Data Fetch From branch.html file
if (req.method === "POST" && req.url === "/branchdata") {
  branchmodal.branchModalAPI(req, res, dbs);
}
//2.2: GET Branch Data Modal API
if (req.method === "GET" && req.url === "/getbranchdata") {
  branchmodal.getBranchDataAPI(req, res, dbs);
}
//2.3: GET ComanywiseBranch Data in change effetc Modal API
if (req.method === "GET" && req.url.startsWith("/getCompanyWiseBranch")) {
  branchmodal.comanywisebranch(req, res, dbs);
}

//1 Department Full crud
if (req.method === "POST" && req.url === "/departmentdataapi") {
  departmentModal.departmentModalAPI(req, res, dbs);
}
//2: GET Department Data Modal API
if (req.method === "GET" && req.url === "/getdepartmentdata") {
  departmentModal.getDepartmentDataAPI(req, res, dbs);
}
//3
if (req.method === "POST" && req.url === "/singledata") {
  departmentModal.singledata(req, res, dbs);
}
//4
if (req.method === "PUT" && req.url === "/Updateddata") {
  departmentModal.Updateddata(req, res, dbs);
}
//5
if (req.method === "DELETE" && req.url === "/Deletedata") {
  departmentModal.Deletedata(req, res, dbs);
}

//4: Designation Data Fetch From designation.html
if (req.method === "POST" && req.url === "/designationdataapi") {
  designationmodal.designationModalAPI(req, res, dbs);
}
//4.4: GET Designation Data Modal API
if (req.method === "GET" && req.url === "/getdesignationdata") {
  designationmodal.getDesignationDataAPI(req, res, dbs);
}

//5: Reporting_manager Data Fetch From reportingmanager.html
if (req.method === "POST" && req.url === "/reportingmanagerapi") {
  reportingmanager.reportinModalAPI(req, res, dbs);
}

//5.5 Get Reporting Manager Data Modal API
if (req.method === "GET" && req.url === "/getreportingmanager") {
  reportingmanager.getreportingmanger(req, res, dbs);
}

//6: Role Data Fetch From role.html
if (req.method === "POST" && req.url === "/roledata") {
  rolemodal.rolemodalAPI(req, res, dbs);
}
//6: Role Data Fetch From role.html
// if (req.method === "GET" && req.url === "/getroledata") {
//   rolemodal.getroledata(req, res, dbs);
// }

//Attendance CRUD Operation 1:
if (req.method === "POST" && req.url === "/Attendancedata") {
  Attendance.Attendancepost(req, res, dbs);
}
//2
if (req.method === "GET" && req.url === "/getattendancedata") {
  Attendance.GetAttandance(req, res, dbs);
}
//3
if (req.method === "POST" && req.url === "/getsingalattendancedata") {
  Attendance.singledata(req, res, dbs);
}
//4
if (req.method === "PUT" && req.url === "/updatedattandancedata") {
  Attendance.updateddata(req, res, dbs);
}
//5
if (req.method === "DELETE" && req.url === "/deletedataattandance") {
  Attendance.delateddata(req, res, dbs);
}
});

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
});

app.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
