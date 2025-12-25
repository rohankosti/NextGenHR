import Attendance from '../Model/Attandance.js';

const Attendancepost = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const parse = JSON.parse(body);
    const Attendance = await dbs.collection("Attendance").insertOne(parse);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ msg: "Data Stored Sucsessfully" }));
  });
};
const GetAttandance = async (req, res, dbs) => {
  const getdata = await dbs.collection("Attendance").find({}).toArray();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(getdata));
};

const singledata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const sinparse = JSON.parse(body);
    // console.log(sinparse);
    const single = await dbs
      .collection("Attendance")
      .findOne({ _id: new ObjectId(sinparse.id) });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(single));
  });
};

const updateddata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const upparse = JSON.parse(body);
    // console.log(upparse);
    const upcollection = await dbs.collection("Attendance").updateOne(
      { _id: new ObjectId(upparse.id) },
      {
        $set: {
          Name: upparse.Name,
          date: upparse.Date,
          check_in: upparse.Check_in,
          check_out: upparse.Check_out,
          status: upparse.Stetus,
        },
      }
    );
    if (upcollection.modifiedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Attandance Data Sucsessfully Updated" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Attandance Data Can't Be Updated" }));
    }
  });
};

const delateddata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const delparse = JSON.parse(body);
    // console.log(delparse);
    const delcollection = await dbs
      .collection("Attendance")
      .deleteOne({ _id: new ObjectId(delparse.id) });
    if (delcollection.deletedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "User Data Delete Sucssesfuuly" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ msg: "User Data Can't be Delete" }));
    }
  });
};
const Attendance = {
  Attendancepost,
  GetAttandance,
  singledata,
  updateddata,
  delateddata,
};

export default Attendance;
