import http from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import { json } from "stream/consumers";

const url = "mongodb://admin:admin123@127.0.0.1:27017/?authSource=admin";
const client = new MongoClient(url);
const dbs_name = "nextgenHR";

client.connect ().then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDb Server Not Connected ! Error", err);
  });

const dbs = client.db(dbs_name);

const server = http.createServer((req, res) => {
  //Frontend localhost:5500 or file:// se backend localhost:3000 ko call kar raha hai → Browser ise allowed nahi karega.
  // Backend se response aayega hi nahi.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //   Browser POST request bhejne se pehle ek check karta hai:
  //   "OPTIONS request (preflight) — server allow karta hai ya nahi?"
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  //1:API to store jobpost.html form vacancy data and save in Mongodb database
  if (req.method === "POST" && req.url === "/storeJobVacancy") {
    // console.log("Recived a Post Request");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on("end", async () => {
      const formdata = JSON.parse(body); //Ab jo data aya hai use parse kar ke JS object me convert kar lo
      const collection = dbs.collection("jobvecancy"); // jobvecancy naam ka collection use karo agar hai to, nahi to bana do
      const result = await collection.insertOne(formdata); // formdata ko ab DB me store kar do
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Job Veccancy Stored Succsesfully!" })); //res.end() ko OBJECT nahi STRING chahiye
    });
  }
  //2:API to fetch all job vacancy data ans show in table in viewJobpostData.html
  if (req.method === "GET" && req.url === "/jobvecancylist") {
    (async () => {
      const getjobvecancy_collection = await dbs
        .collection("jobvecancy")
        .find({})
        .toArray();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(getjobvecancy_collection)); //Bhai res.end() hamesha STRING hi bhejta hai, object nahi.
    })();
  }

  //3:API to fetch single job vacancy data and show in modal in viewJobpostData.html
  if (req.method === "POST" && req.url === "/jobvecancysingledata") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      let singleparse = JSON.parse(body);
      const singaldata = await dbs.collection("jobvecancy").findOne({ _id: new ObjectId(singleparse.id) });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(singaldata)); //Bhai res.end() hamesha STRING hi bhejta hai, object nahi.
    });
  }

  //4:API to update job vacancy data from modal in viewJobpostData.html
  if (req.method === "PUT" && req.url === "/updatejobapplicationdata") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      // console.log(body,"bodyupdated");

      const updateparse = JSON.parse(body);
      // console.log("updated body in json", updateparse);
      const updatecollection = await dbs.collection("jobvecancy").updateOne(
        { _id: new ObjectId(updateparse.id) },
        {
          $set: {
            name: updateparse.name,
            email: updateparse.email,
            position: updateparse.position,
            resume: updateparse.resume,
          },
        }
      );
      if (updatecollection.modifiedCount === 1) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ message: "Job Vacancy Updated Successfully!" })
        );
      } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ message: "No changes made to the Job Vacancy." })
        );
      }
    });
  }

  //5:API to delete job vacancy data from viewJobpostData.html
  if (req.method === "DELETE" && req.url === "/deletejobapplicationdata") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const delateparse = JSON.parse(body);
      // console.log(delateparse, "delate data");
      const delatecollection = await dbs.collection("jobvecancy").deleteOne({ _id: new ObjectId(delateparse.id) });
      // console.log(delatecollection, "delate collection");
      if (delatecollection.deletedCount === 1) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ message: "Job Vacancy Deleted Successfully!" })
        );
      } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Job Vacancy Not Deleted!" }));
      }
    });
  }

  //6: Comapany Data Fetch From Comapny.html file
  if (req.method==="POST" && req.url==="/companydata") {
    let body="";
    req.on("data",(chunk)=>{
        body+= chunk.toString();
        console.log(body);
        
    })

   req.on("end",async()=>{
    let comapanyparse = JSON.parse(body)
    const comapany_collection =await dbs.collection("comapny").insertOne(comapanyparse);
    res.writeHead(200,{"content-type":"application/json"});
    res.end(JSON.stringify({msg:"Data Saved Sucssesfully"}));
   })
  }

  //7: Branch Data Fetch From branch.html file
  if (req.method==="POST" && req.url==="/branchdata") {
    let body="";
    req.on("data",(chunk)=>{
        body+= chunk.toString();
        console.log(body);
        
    })

   req.on("end",async()=>{
    let branchyparse = JSON.parse(body)
    const branch_collection =await dbs.collection("Branch").insertOne(branchyparse);
    res.writeHead(200,{"content-type":"application/json"});
    res.end(JSON.stringify({msg:"Data Saved Sucssesfully"}));
   })
  }

  //8: Department Data Fetch From employe.html file
  if (req.method==="POST" && req.url==="/employedata") {
    
      let body="";
      req.on("data",(chunk)=>{
      body+= chunk.toString();
      console.log(body);
    })

      req.on("end",async()=>{
      let employeparse = JSON.parse(body);
      let employe_collection = await dbs.collection("Employe").insertOne(employeparse);
      res.writeHead(200,{"content-type":"application/json"});
      res.end(JSON.stringify({msg:"Data Saved Sucssesfully"}));
      })
  }


});

 process.on("SIGINT",async()=>{
 await client.close()
  console.log("MongoDB connection closed.");
  });

server.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
