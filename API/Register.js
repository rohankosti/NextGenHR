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

const getregiterdata =async (req,res,dbs)=>{
  const register = await dbs.collection("Register").find({}).toArray();
  res.writeHead(200,{"content-type":"application/json"});
  res.end(JSON.stringify(register));
}

const registermodal = {
  registerdata,
  lastemploye,
  getregiterdata,
};

export default registermodal;
