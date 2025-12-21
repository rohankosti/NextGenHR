import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//4. Designation Modal API
const designationModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });
  req.on("end", async () => {
    let designationparse = JSON.parse(body);
    let designation_collection = await dbs
      .collection("Designation")
      .insertOne(designationparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};
//4.4: GET Designation Data Modal API
const getDesignationDataAPI = async (req, res, dbs) => {
  const designationData = await dbs
    .collection("Designation")
    .find({})
    .toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(designationData));
};

const designationmodal={
  designationModalAPI,
  getDesignationDataAPI,
}

export default designationmodal;