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

//5. Reporting Manager Modal API
router.post("/reportingmanagerapi", async (req, res, dbs) => {
  const bodydata = req.body;
  let report_collection = await dbs
    .collection("Reporting_Manager")
    .insertOne(bodydata);
  res.status(200).send({ message: "Reporting Manager Data Inserted Successfully" });
});

router.get("/getreportingmanager", async (req, res) => {
  let reportigmandata = await dbs
    .collection("Reporting_Manager")
    .find({})
    .toArray();
  res.status(200).send(reportigmandata);
});

export default router;
