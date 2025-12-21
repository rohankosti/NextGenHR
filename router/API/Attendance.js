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

router.post("/Attendancedata", async (req, res) => {
  const body = req.body;
  const Attendance = await dbs.collection("Attendance").insertOne(body);
  res.status(200).send({ msg: "Data Stored Sucsessfully" });
});

router.get("/getattendancedata", async (req, res) => {
  const getdata = await dbs.collection("Attendance").find({}).toArray();
  res.status(200).send(getdata);
});

router.post("/getsingalattendancedata", async (req, res) => {
  const singledata = req.body;
  const single = await dbs
    .collection("Attendance")
    .findOne({ _id: new ObjectId(singledata.id) });
  res.status(200).send(single);
});

router.put("/updatedattandancedata", async (req, res) => {
  const updatebody = req.body;
  console.log(updatebody);
  
  const upcollection = await dbs.collection("Attendance").updateOne(
    { _id: new ObjectId(updatebody.id) },
    {
       $set: {
          emp_id: updatebody.emp_id,
          date: updatebody.Date,
          check_in: updatebody.Check_in,
          check_out: updatebody.Check_out,
          status: updatebody.Stetus,
        },
    }
  );
  if (upcollection.modifiedCount === 1) {
    res.status(200).send({ msg: "Attandance Data Sucsessfully Updated" });
  } else {
    res.status(200).send({ msg: "Attandance Data Can't Be Updated" });
  }
});

router.delete("/deletedataattandance", async (req, res) => {
  const delatebody = req.body;
  const delcollection = await dbs
    .collection("Attendance")
    .deleteOne({ _id: new ObjectId(delatebody.id) });
  if (delcollection.deletedCount === 1) {
    res.status(200).send({ msg: "User Data Delete Sucssesfuuly" });
  } else {
    res.status(200).send({ msg: "User Data Can't be Delete" });
  }
});
export default router;
