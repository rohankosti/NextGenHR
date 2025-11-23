import http from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";
import jobApplication from "./API/JobApplication.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const filedir = fileURLToPath(import.meta.url);
// console.log(filedir);
const dirname = path.dirname(filedir);
// console.log(dirname);

const client = new MongoClient(process.env.MONGO_URL);
const dbs_name = process.env.MONGO_DB;

client.connect().then(() => 
{
console.log("MongoDB connected successfully");
})
.catch((err) => 
{
console.log("MongoDb Server Not Connected ! Error", err);
});

const dbs = client.db(dbs_name);

const server = http.createServer(async(req, res) => 
  {
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

        //serve index.html file
        if (req.url === "/" || req.url === "/index.html")
        {
           jobApplication.fileserve(req,res,fs,path,dirname)
        }
         //serve login.html file
        else if (req.url === "/login.html")
        { 
           jobApplication.fileserve(req,res,fs,path,dirname)
        }
          //serve jobpost.html file
        else if (req.url === "/jobpost.html")
        {
           jobApplication.fileserve(req,res,fs,path,dirname) 
        }
         //serve viewJobpostData.html file
        else if (req.url === "/viewJobpostData.html")
        {
           jobApplication.fileserve(req,res,fs,path,dirname) 
        }

        //1:API to store jobpost.html form vacancy data and save in Mongodb database
        if (req.method === "POST" && req.url === "/storeJobVacancy") 
          {
               jobApplication.storejobvecancy(req,res,dbs)
          }
        //2:API to fetch all job vacancy data ans show in table in viewJobpostData.html
        if (req.method === "GET" && req.url === "/jobvecancylist") 
          {
               jobApplication.jobvecancylist(req,res,dbs)
          }

        //3:API to fetch single job vacancy data and show in modal in viewJobpostData.html
        if (req.method === "POST" && req.url === "/jobvecancysingledata") 
          {
               jobApplication.jobvecancysingledata(req,res,dbs)
          }

        //4:API to update job vacancy data from modal in viewJobpostData.html
        if (req.method === "PUT" && req.url === "/updatejobapplicationdata") 
          {
               jobApplication.updatejobapplicationdata(req,res,dbs)
          }

        //5:API to delete job vacancy data from viewJobpostData.html
        if (req.method === "DELETE" && req.url === "/deletejobapplicationdata") 
          {
               jobApplication.deletejobapplicationdata(req,res,dbs)
          }
  });

process.on("SIGINT", async () => 
{
  await client.close();
  console.log("MongoDB connection closed.");
});

server.listen(3000, () => 
{
  console.log(`server started on 3000 port http://localhost:3000`);
});
