import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import { json } from "stream/consumers";

//1:API to fetch Register.html form data and save in Mongodb database
const registerdata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const regData = JSON.parse(body);
    const ragisterCollection = dbs.collection("Register").insertOne(regData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Employee Data Stored Successfully" }));
  });
};

//API use for Auto Generated register.html Comapny code and save mongodb

const lastemploye = async (req, res, dbs) => {
  const lastemp = await dbs
    .collection("Register")
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(lastemp));
};

const getregiterdata = async (req, res, dbs) => {
  const register = await dbs.collection("Register").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(register));
};

const singleuserdashboard = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async (e) => {
    const parse = JSON.parse(body);
    const single = await dbs
      .collection("Register")
      .findOne({ _id: new ObjectId(parse.id) });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(single));
  });
};

const updateduserdashboard = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const upparse = JSON.parse(body);
    console.log(upparse);

    const upcollection = await dbs.collection("Register").updateOne(
      { _id: new ObjectId(upparse.id) },
      {
        $set: {
          name: upparse.name,
          email: upparse.email,
          role: upparse.role,
          status: upparse.status,
        },
      }
    );

    if (upcollection.modifiedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "User Data Update Sucssesfuuly" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Data Can't be Updated" }));
    }
  });
};

const deleteuserdashboard = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const delparse = JSON.parse(body);
    // console.log(delparse);
    const delcollection = await dbs
      .collection("Register")
      .deleteOne({ _id: new ObjectId(delparse.id) });
    if (delcollection.deletedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "User Data Delete Sucssesfuuly" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "User Data Can't be Delete" }));
    }
  });
};

const registermodal = {
  registerdata,
  lastemploye,
  getregiterdata,
  singleuserdashboard,
  updateduserdashboard,
  deleteuserdashboard,
};

export default registermodal;
