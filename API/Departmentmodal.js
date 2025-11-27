import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//3. Department Modal API
const departmentModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
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

const departmentModal ={
  departmentModalAPI,
  getDepartmentDataAPI,
}

export default departmentModal;
