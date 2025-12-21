import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//1. Company Modal API
const comapnyModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let comapanyparse = JSON.parse(body);
    const comapany_collection = await dbs
      .collection("comapny")
      .insertOne(comapanyparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

//1.1: GET Company Data Modal API
const getComapnyDataAPI = async (req, res, dbs) => {
  const companyData = await dbs.collection("comapny").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(companyData));
};

const comapnymodal = {
   comapnyModalAPI,
   getComapnyDataAPI,
}

export default comapnymodal;