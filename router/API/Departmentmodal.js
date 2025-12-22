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

//3. Department Modal API
router.post("/departmentdataapi", async (req, res) => {
  const fromdata = req.body;
  const collection = await dbs.collection("Department").insertOne(fromdata);
  res.status(200).send({ message: "Department Data Saved Successfully" });
});

//3.3: GET Department Data Modal API
router.get("/getdepartmentdata", async (req, res) => {
  const departmentData = await dbs.collection("Department").find({}).toArray();
  res.status(200).send(departmentData);
});

router.post("/singledata", async (req, res) => {
  const single = req.body;
  console.log(single);
  const sincollection = await dbs
    .collection("Department")
    .findOne({ _id: new ObjectId(single.id) });
  res.status(200).send(sincollection);
});

router.put("/Updateddata", async (req, res) => {
  const updatebody = req.body;
  const upcollection = await dbs.collection("Department").updateOne(
    { _id: new ObjectId(updatebody.id) },
    {
      $set: {
        dept_name: updatebody.dep,
          company_id: updatebody.com,
          branch_id: updatebody.bra,
          manager_id: updatebody.man,
      },
    }
  );
  if (upcollection.modifiedCount === 1) {
    res.status(200).send({ message: "Department Data Updated Successfully!" });
  } else {
    res.status(200).send({ message: "Data Can't Be Updated" });
  }
});

router.delete("/Deletedata", async (req, res) => {
  const delparse = req.body;
  const delcollection = await dbs
    .collection("Department")
    .deleteOne({ _id: new ObjectId(delparse.id) });

  if (delcollection.deletedCount === 1) {
    res.status(200).send({ message: "Department Data Deleted Successfully!" });
  } else {
    res.status(200).send({ message: "Data Can't Be Deleted" });
  }
});

export default router;
