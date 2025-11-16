import http from "http";
import mongodb, { Collection, MongoClient } from "mongodb";

const url =  "mongodb://admin:admin123@127.0.0.1:27017/?authSource=admin";
const client = new MongoClient(url);
const dbs_name = "nextgenHR";


client.connect().then(()=>{
  console.log("MongoDB connected successfully");
}).catch((err)=>{
  console.log("MongoDb Server Not Connected ! Error", err);
  
});


const dbs = client.db(dbs_name);



const server = http.createServer((req, res) => {
  //Frontend localhost:5500 or file:// se backend localhost:3000 ko call kar raha hai → Browser ise allowed nahi karega.
  // Backend se response aayega hi nahi.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //   Browser POST request bhejne se pehle ek check karta hai:
  //   "OPTIONS request (preflight) — server allow karta hai ya nahi?"
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/storeJobVacancy") {
    console.log("Recived a Post Request");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });



    req.on("end", async () => {
      const formdata = JSON.parse(body); //Ab jo data aya hai use parse kar ke JS object me convert kar lo

      const collection = dbs.collection("jobvecancy")// jobvecancy naam ka collection use karo agar hai to, nahi to bana do

      const result = await collection.insertOne(formdata); // formdata ko ab DB me store kar do

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Job Veccancy Stored Succsesfully!" }));//res.end() ko OBJECT nahi STRING chahiye

    });
  }
            
       if (req.method ==="GET" && req.url==="/jobvecancylist") {
       (async ()=>{
          const getjobvecancy_collection = await dbs.collection("jobvecancy").find({}).toArray();
          res.writeHead(200,{"content-type":"application/json"});
          res.end(JSON.stringify(getjobvecancy_collection));//Bhai res.end() hamesha STRING hi bhejta hai, object nahi.
       })();
       }

});

server.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
