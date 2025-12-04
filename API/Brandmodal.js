import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import url from "url";

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

//2.2: GET Branch Data Modal API
const getBranchDataAPI = async (req, res, dbs) => {
  const branchData = await dbs.collection("Branch").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(branchData));
};

//3 API use for find branch collection and company and change branch name
const comanywisebranch = async (req, res, dbs) => {
  // 👇 Correct way to read query params in core Node HTTP server
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const companyName = urlObj.searchParams.get("companyName");
  console.log("Backend received:", companyName);
  const branches=await dbs.collection("Branch").find({ comany: companyName }).toArray()
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(branches));
};

const branchmodal = {
  branchModalAPI,
  getBranchDataAPI,
  comanywisebranch,
};

export default branchmodal;
