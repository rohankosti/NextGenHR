import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

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

const branchmodal ={
  branchModalAPI,
  getBranchDataAPI,
}

export default branchmodal;