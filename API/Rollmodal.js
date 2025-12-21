import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

//6. Role Modal API
const rolemodalAPI = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });
  req.on("end", async () => {
    let roleparse = JSON.parse(body);
    let role_collection = await dbs.collection("Role").insertOne(roleparse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Saved Sucssesfully" }));
  });
};

const getroledata =async (req,res,dbs)=>{
  const getroll = await dbs.collection("Role").find({}).toArray();
  res.writeHead(200,{"content-type":"application/json"})
  res.end(JSON.stringify(getroll));
}


const rolemodal ={
  rolemodalAPI,
  getroledata
}

export default rolemodal;