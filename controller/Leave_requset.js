import { ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const leavereq = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    // console.log(body);
  });

  req.on("end", async () => {
    let leaveparse = JSON.parse(body);
    let depart_collection = await dbs
      .collection("LeaveRequset")
      .insertOne(leaveparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

const getleavereq = async (req, res, dbs) => {
  const data = await dbs.collection("LeaveRequset").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
};

const singleleaverequest = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    // console.log(body);
  });

  req.on("end", async () => {
    let leaveparse = JSON.parse(body);
    // console.log(leaveparse);
    let depart_collection = await dbs
      .collection("LeaveRequset")
      .findOne({ _id: new ObjectId(leaveparse.id) });
    // console.log(depart_collection);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(depart_collection));
  });
};

const updatedleave = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    // console.log(body);
    const parse = JSON.parse(body);
    const updated = await dbs.collection("LeaveRequset").updateOne(
      { _id: new ObjectId(parse.id) },
      {
        $set: {
          status: parse.status,
        },
      }
    );
    if (updated.modifiedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Leave Request Updated Sucssesfully" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          msg1: "Leave Request Can't be updated ",
          msg: "Leave Request Updated Sucssesfully",
        })
      );
    }
  });
};

const delateleaverequest = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    // console.log(body);
    const rejparse = JSON.parse(body);
    // console.log(rejparse);
    const rejcollection = await dbs
      .collection("LeaveRequset")
      .deleteOne({ _id: new ObjectId(rejparse.id) });
    if (rejcollection.deletedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Leave Request Reject Succsesfully" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          msg1: "Leave Request Can't be Rejected ",
        })
      );
    }
  });
};

const leaverequest = {
  leavereq,
  getleavereq,
  singleleaverequest,
  updatedleave,
  delateleaverequest,
};

export default leaverequest;
