import { ObjectId } from "mongodb";


// const storejobvecancy = async (req, res, dbs) => {
//   const formdata = req.body;
//   const jobcollection = await dbs.collection("jobvecancy").insertOne(formdata);
//   res.redirect("/jobpost.html");
// };

const storejobvecancy = (req, res, dbs) => {
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
};

const jobvecancylist = (req, res, dbs) => {
  (async () => {
    const getjobvecancy_collection = await dbs
      .collection("jobvecancy")
      .find({})
      .toArray();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(getjobvecancy_collection)); //Bhai res.end() hamesha STRING hi bhejta hai, object nahi.
  })();
};

const jobvecancysingledata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    let singleparse = JSON.parse(body);
    const singaldata = await dbs
      .collection("jobvecancy")
      .findOne({ _id: new ObjectId(singleparse.id) });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(singaldata)); //Bhai res.end() hamesha STRING hi bhejta hai, object nahi.
  });
};

const updatejobapplicationdata = (req, res, dbs) => {
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
      res.end(JSON.stringify({ message: "Job Vacancy Updated Successfully!" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({ message: "No changes made to the Job Vacancy." })
      );
    }
  });
};

const deletejobapplicationdata = (req, res, dbs) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const delateparse = JSON.parse(body);
    // console.log(delateparse, "delate data");
    const delatecollection = await dbs
      .collection("jobvecancy")
      .deleteOne({ _id: new ObjectId(delateparse.id) });
    // console.log(delatecollection, "delate collection");
    if (delatecollection.deletedCount === 1) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Job Vacancy Deleted Successfully!" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Job Vacancy Not Deleted!" }));
    }
  });
};

//

const fileserve = async (req, res, fs, path, dirname) => {
  //server index.html file
  if (req.url === "/" || req.url === "/index.html") {
    const data = await fs.readFile(path.join(dirname, "WEB/index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  }
  //serve login.html file
  else if (req.url === "/login.html") {
    const logindata = await fs.readFile(path.join(dirname, "WEB/login.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(logindata);
  }
  //serve jobpost.html file
  else if (req.url === "/jobpost.html") {
    const jobpostData = await fs.readFile(
      path.join(dirname, "WEB/jobpost.html")
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(jobpostData);
  }
  //serve viewJobpostData.html file
  else if (req.url === "/viewJobpostData.html") {
    const viewJobpostData = await fs.readFile(
      path.join(dirname, "WEB/viewJobpostData.html")
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(viewJobpostData);
  }
};

const jobApplication = {
  storejobvecancy,
  jobvecancylist,
  jobvecancysingledata,
  updatejobapplicationdata,
  deletejobapplicationdata,
  fileserve,
};

export default jobApplication;
