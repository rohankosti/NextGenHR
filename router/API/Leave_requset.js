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

router.post("/leaverequest", async (req, res) => {
  const leaveparse = req.body;
  let depart_collection = await dbs
    .collection("LeaveRequset")
    .insertOne(leaveparse);
  res.status(200).send({ message: "Leave Request Sent Successfully" });
});

router.get("/getleaverequest", async (req, res) => {
  const data = await dbs.collection("LeaveRequset").find({}).toArray();
  res.status(200).send(data);
});

router.post("/singleleaverequest", async (req, res) => {
  const singlebody = req.body;
  let depart_collection = await dbs
    .collection("LeaveRequset")
    .findOne({ _id: new ObjectId(singlebody.id) });
  // console.log(depart_collection);
  res.status(200).send(depart_collection);
});

router.put("/updatedleaverequest", async (req, res) => {
  // const body = req.body;
  const updated = await dbs.collection("LeaveRequset").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        status: body.status,
      },
    }
  );
  if (updated.modifiedCount === 1) {
    res.status(200).send({ message: "Leave Request Updated Sucssesfully!" });
  } else {
    res.status(200).send({
      message: "Leave Request Can't be updated",
      success: false,
    });
  }
});

router.delete("/delateleaverequest", async (req, res) => {
  const deldata = req.body;
  const rejcollection = await dbs
    .collection("LeaveRequset")
    .deleteOne({ _id: new ObjectId(deldata.id) });
  if (rejcollection.deletedCount === 1) {
    res.status(200).send({ message: "Leave Request Deleted Successfully!" });
  } else {
    res.status(200).send({ message: "Leave Request Not Deleted!" });
  }
});

export default router;
