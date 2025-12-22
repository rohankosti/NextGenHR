// import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import jobApplication from "./router/API/JobApplication.js";
import registermodal from "./router/API/Register.js";
import comapnymodal from "./router/API/Companymodal.js";
import branchmodal from "./router/API/Brandmodal.js";
import departmentModal from "./router/API/Departmentmodal.js";
import designationmodal from "./router/API/Designationmodal.js";
import reportingmanager from "./router/API/Reportingmanager_modal.js";
import rolemodal from "./router/API/Rollmodal.js";
import logindata from "./router/API/Authentication.js";
import leaverequest from "./router/API/Leave_requset.js";
import Attendance from "./router/API/Attendance.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.static("WEB"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================== API Routes ====================
app.use(jobApplication);
app.use(registermodal);
app.use(branchmodal);
app.use(comapnymodal);
app.use(departmentModal);
app.use(designationmodal);
app.use(reportingmanager);
app.use(rolemodal);
app.use(leaverequest);
app.use(logindata);
app.use(Attendance);
// ==================== WEB Routes ====================
// app.use(webRoutes);







// process.on("SIGINT", async () => {
//   await client.close();
//   console.log("MongoDB connection closed.");
//   process.exit(0);
// });

app.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
