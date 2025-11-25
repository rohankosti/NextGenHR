import http from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//1. Company Modal API
const comapnyModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let comapanyparse = JSON.parse(body);
    const comapany_collection = await dbs
      .collection("comapny")
      .insertOne(comapanyparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

//2. Branch Modal API
const branchModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let branchyparse = JSON.parse(body);
    const branch_collection = await dbs
      .collection("Branch")
      .insertOne(branchyparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

//3. Department Modal API
const departmentModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let departmentparse = JSON.parse(body);
    let depart_collection = await dbs
      .collection("Department")
      .insertOne(departmentparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

//4. Designation Modal API
const designationModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });
  req.on("end", async () => {
    let designationparse = JSON.parse(body);
    let designation_collection = await dbs
      .collection("Designation")
      .insertOne(designationparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

//5. Reporting Manager Modal API
const reportinModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let reportparse = JSON.parse(body);
    let report_collection = await dbs
      .collection("Reporting_Manager")
      .insertOne(reportparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Successfully" }));
  });
};

//6. Role Modal API
const rolemodalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });
  req.on("end", async () => {
    let roleparse = JSON.parse(body);
    let role_collection = await dbs.collection("Role").insertOne(roleparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

const ModalAPI = {
  comapnyModalAPI,
  branchModalAPI,
  departmentModalAPI,
  designationModalAPI,
  reportinModalAPI,
  rolemodalAPI,
};

export default ModalAPI;
