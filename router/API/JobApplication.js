import Router from "express";
import { ObjectId, MongoClient } from "mongodb";
import express from 'express';
import jobApplication from '../../controller/JobApplication';
import dotenv from "dotenv";
dotenv.config();
const router = Router();

router.post('/storejobvecancy',);
// const client = new MongoClient(process.env.MONGO_URL);
// const dbs_name = process.env.MONGO_DB;
// client
//   .connect()
//   .then(() => {
//     // console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.log("MongoDb Server Not Connected ! Error", err);
//   });

// const dbs = client.db(dbs_name);

// router.post("/storeJobVacancy", async (req, res) => {
//   const fromdata = req.body;
//   const collection = await dbs.collection("jobvecancy").insertOne(fromdata);
//   res.status(200).send({ message: "Job Vacancy Posted Successfully" });
// });

// router.get("/jobvecancylist", async (req, res) => {
//   const getjobpost = await dbs.collection("jobvecancy").find({}).toArray();
//   res.status(200).send(getjobpost);
// });

// router.post("/jobvecancysingledata", async (req, res) => {
//   const singledata = req.body;
//   const singaldata = await dbs
//     .collection("jobvecancy")
//     .findOne({ _id: new ObjectId(singledata.id) });
//   res.status(200).send(singaldata);
// });

// router.put("/updatejobapplicationdata", async (req, res) => {
//   const updatebody = req.body;
//   const updatecollection = await dbs.collection("jobvecancy").updateOne(
//     { _id: new ObjectId(updatebody.id) },
//     {
//       $set: {
//         name: updatebody.name,
//         email: updatebody.email,
//         position: updatebody.position,
//         resume: updatebody.resume,
//       },
//     }
//   );
//   if (updatecollection.modifiedCount === 1) {
//     res.status(200).send({ message: "Job Vacancy Updated Successfully!" });
//   } else {
//     res.status(200).send({ message: "No changes made to the Job Vacancy." });
//   }
// });

// router.delete("/deletejobapplicationdata", async (req, res) => {
//   const delateparse = req.body;
//   const delatecollection = await dbs
//     .collection("jobvecancy")
//     .deleteOne({ _id: new ObjectId(delateparse.id) });

//   if (delatecollection.deletedCount === 1) {
//     res.status(200).send({ message: "Job Vacancy Deleted Successfully!" });
//   } else {
//     res.status(200).send({ message: "Job Vacancy Not Deleted!" });
//   }
// });

// export default router;
