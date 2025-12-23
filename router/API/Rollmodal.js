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

//6. Role Modal API
router.post("/roledata", async (req, res, dbs) => {
  const body = req.body;
  let role_collection = await dbs.collection("Role").insertOne(body);
  res.status(200).send({ msg: "Data Saved Successfully" });
});
router.get("/getroledata", async (req, res) => {
  const getroll = await dbs.collection("Role").find({}).toArray();
  res.status(200).send(getroll);
});

export default router;
