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

//4. Designation Modal API
router.post("/designationdataapi", async (req, res) => {
 const body = req.body;
    
    let designation_collection = await dbs
      .collection("Designation")
      .insertOne(body);
    res.status(200).send({ msg: "Data Saved Sucssesfully" });
  });

//4.4: GET Designation Data Modal API
router.get("/getdesignationdata", async (req, res) => {
  const designationData = await dbs
    .collection("Designation")
    .find({})
    .toArray();
  res.status(200).send(designationData);
});


export default router;