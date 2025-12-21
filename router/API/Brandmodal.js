import { ObjectId, MongoClient } from "mongodb";
import Router from "express";
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

const router = Router();
const dbs = client.db(dbs_name);

//2. Branch Modal API
router.post("/branchdata", async (req, res, dbs) => {
  const body = req.body;
  const branch_collection = await dbs
      .collection("Branch")
      .insertOne(body);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });


//2.2: GET Branch Data Modal API
router.get("/getbranchdata", async (req, res) => {
  const branchData = await dbs.collection("Branch").find({}).toArray();
res.status(200).send(branchData);
});

//3 API use for find branch collection and company and change branch name
router.get("/getCompanyWiseBranch", async (req, res) => {
  const companyName = req.query.companyName;
  const branches = await req.app.locals.dbs.collection("Branch").find({ comany: companyName }).toArray();
  res.status(200).send(branches);
});

export default router;


// router.get("/getCompanyWiseBranch", async (req, res, dbs) => {
//new URL: URL ko parse karta hai(object) 
  // new URL( // req.url, "/getbranch?companyName=NextGen" // http://${req.headers.host} "http://localhost:3000" // ); 
  // const urlObj = new URL(req.url, http://${req.headers.host}); 
  // console.log(urlObj); const companyName = urlObj.searchParams.get("companyName"); 
  // // console.log("Backend received:", companyName);
  //  const branches=await dbs.collection("Branch").find({ comany: companyName }).toArray() 
  // res.status(200).send(branches);
  //  });