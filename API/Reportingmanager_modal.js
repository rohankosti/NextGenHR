import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//5. Reporting Manager Modal API
const reportinModalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let reportparse = JSON.parse(body);
    let report_collection = await dbs
      .collection("Reporting_Manager")
      .insertOne(reportparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Successfully" }));
  });
};

const getreportingmanger =async (req,res,dbs)=>{
   let reportigmandata= await dbs.collection("Reporting_Manager").find({}).toArray();
    res.writeHead(200,{"content-type":"application/json"});
    res.end(JSON.stringify(reportigmandata));
}

const reportingmanager={
    reportinModalAPI,
    getreportingmanger,
}

export default reportingmanager;