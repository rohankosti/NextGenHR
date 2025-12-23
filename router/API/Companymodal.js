import { ObjectId, MongoClient } from "mongodb";
import Router from "express";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const dbs_name = process.env.MONGO_DB;
client
  .connect()
  .then(() => {
    // console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDb Server Not Connected ! Error", err);
  });

const router = Router();
const dbs = client.db(dbs_name);

//1. Company Modal API
router.post("/getcomapnydata", async (req, res) => {
 const comapanyparse = req.body;
 const comapany_collection = await dbs
   .collection("comapny")
   .insertOne(comapanyparse);
 res.status(200).send({ message: "Company Data Saved Successfully" });
});

//1.1: GET Company Data Modal API
router.get("/getcomapnydata", async (req, res) => {
  const companyData = await dbs.collection("comapny").find({}).toArray();
  res.status(200).send(companyData);
});

export default router;