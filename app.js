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
import url from "url";
import dotenv from "dotenv";
dotenv.config();

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

const server = http.createServer((req, res) => {
  //Frontend localhost:5500 or file:// se backend localhost:3000 ko call kar raha hai → Browser ise allowed nahi karega.
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
  //API use for Auto Generated comany code get the exact name(NEXTGEN,AVIVORA etc...)
  const parsedUrl = url.parse(req.url, true); // parse url
  if (req.method === "GET" && req.url.startsWith("/autogenratecomany/")) {
    // company_id ko URL se extract karo
    const companyId = parsedUrl.pathname.split("/")[2]; // /autogenratecomany/:companyId
    registermodal.autogenratecomany(req, res, dbs, companyId);
  }
  //API use for login Authentication
  if (req.method === "POST" && req.url === "/logindata") {
    logindata.login(req, res, dbs);
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

  //3: Department Data Fetch From department.html file
  if (req.method === "POST" && req.url === "/departmentdataapi") {
    departmentModal.departmentModalAPI(req, res, dbs);
  }
  //3.3: GET Department Data Modal API
  if (req.method === "GET" && req.url === "/getdepartmentdata") {
    departmentModal.getDepartmentDataAPI(req, res, dbs);
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
});

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
});

server.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
