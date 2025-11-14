import http from "http";
import mongodb, { MongoClient } from "mongodb";

const url = "mongodb://<credentials>@127.0.0.1:27017";
const client = new MongoClient(url);
const dbs = "nextgenHR";

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
      body += chunk.toString(); //
    });

    req.on("end", () => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Job Veccancy Stored Succsesfully!" }));
    });
  }
});

server.listen(3000, () => {
  console.log(`server started on 3000 port http://localhost:3000`);
});
