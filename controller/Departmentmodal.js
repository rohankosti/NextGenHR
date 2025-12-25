import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import { json } from "stream/consumers";

//3. Department Modal API
const departmentModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    // console.log(body);
  });

  req.on("end", async () => {
    let departmentparse = JSON.parse(body);
    let depart_collection = await dbs
      .collection("Department")
      .insertOne(departmentparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};
//3.3: GET Department Data Modal API
const getDepartmentDataAPI = async (req, res, dbs) => {
  const departmentData = await dbs.collection("Department").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(departmentData));
};

const singledata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const sinparse = JSON.parse(body);
    // console.log(sinparse);
    const sincollection = await dbs
      .collection("Department")
      .findOne({ _id: new ObjectId(sinparse.id) });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(sincollection));
  });
};

const Updateddata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const upparse = JSON.parse(body);
    // console.log(upparse);
    const upcollection = await dbs.collection("Department").updateOne(
      { _id: new ObjectId(upparse.id) },
      {
        $set: {
          dept_name: upparse.dep,
          company_id: upparse.com,
          branch_id: upparse.bra,
          manager_id: upparse.man,
        },
      }
    );
    if (upcollection.modifiedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Data Succsesfully Updated" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Data Can't Be Updated" }));
    }
  });
};
const Deletedata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const delparse = JSON.parse(body);
    console.log(delparse);
    const delcollection = await dbs
      .collection("Department")
      .deleteOne({ _id: new ObjectId(delparse.id) });

    if (delcollection.deletedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Data Sucsessfully Delete" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Data Can't Be Deleted" }));
    }
  });
};

const departmentModal = {
  departmentModalAPI,
  getDepartmentDataAPI,
  singledata,
  Updateddata,
  Deletedata,
};

export default departmentModal;
