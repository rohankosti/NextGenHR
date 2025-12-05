import { ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const leavereq = (req,res,dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });

  req.on("end", async () => {
    let leaveparse = JSON.parse(body);
    let depart_collection = await dbs.collection("LeaveRequset").insertOne(leaveparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};


const getleavereq = async(req, res, dbs)=>{
   const data= await dbs.collection("LeaveRequset").find({}).toArray();
   res.writeHead(200,{"content-type":"application/json"});
   res.end(JSON.stringify(data));
}

const leaverequest = {
  leavereq,
  getleavereq,
};

export default leaverequest;
