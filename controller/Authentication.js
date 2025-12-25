import http, { get } from "http";
import mongodb, { Collection, MongoClient, ObjectId } from "mongodb";

const login = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    // console.log(body);
  });

  req.on("end", async () => {
    const parse = JSON.parse(body);
    console.log(parse, "parse");
    const logindata = await dbs.collection("Register").findOne({ email: parse.email });
    if (logindata) {
      if (parse.email === logindata.email) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(logindata));
      } else {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg1: "Invalid Password" }));
      }
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg2: "User Not Found" }));
    }
  });
};

const logindata = {
  login,
};
export default logindata;
