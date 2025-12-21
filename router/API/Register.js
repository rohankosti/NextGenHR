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

//1:API to fetch Register.html form data and save in Mongodb database
router.post("/registerdata", async (req, res) => {
  const body = req.body;
  const ragisterCollection = dbs.collection("Register").insertOne(body);
  res.status(200).send({ message: "Employee Data Stored Successfully" });
});

//API use for Auto Generated register.html Comapny code and save mongodb
router.get("/lastemployedata", async (req, res) => {
  const lastemp = await dbs.collection("Register").find({}).sort({ _id: -1 }).limit(1).toArray();
  res.status(200).send(lastemp);
});

router.get("/getregisterdata", async (req, res) => {
  const register = await dbs.collection("Register").find({}).toArray();
  res.status(200).send(register);
});
router.post("/singleuserdashboard", async (req, res) => {
  const body = req.body;
  const single = await dbs
    .collection("Register")
    .findOne({ _id: new ObjectId(body.id) });
  res.status(200).send(single);
});

router.put("/updateduserdashboard", async (req, res) => {
  const body = req.body;
  console.log(body);

  const upcollection = await dbs.collection("Register").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        name: body.name,
        email: body.email,
        role: body.role,
        status: body.status,
      },
    }
  );

  if (upcollection.modifiedCount === 1) {
    res.status(200).send({ msg: "User Data Update Successfully" });
  } else {
    res.status(200).send({ msg: "Data Can't be Updated" });
  }
});

router.delete("/deleteuserdashboard", async (req, res) => {
  const body = req.body;
  // console.log(delparse);
  const delcollection = await dbs
    .collection("Register")
    .deleteOne({ _id: new ObjectId(body.id) });
  if (delcollection.deletedCount === 1) {
    res.status(200).send({ msg: "User Data Delete Successfully" });
  } else {
    res.status(200).send({ msg: "User Data Can't be Delete" });
  }
});

export default router;
