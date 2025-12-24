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

router.post("/logindata", async (req, res) => {
  const auth = req.body;
  // console.log(auth);
  
    const logindata = await dbs.collection("Register").findOne({email: auth.email });
    if (logindata) {
      if (auth.password === logindata.password) {
        res.status(200).json(logindata);
      } else {
        res.status(401).json({ msg: "Invalid Password" });
      }
    } else {
      res.status(404).json({ msg: "User Not Found" });
    }
  });



export default router;
