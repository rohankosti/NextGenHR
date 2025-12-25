import jobpost from "../Model/jobpost.js";

const storejobvecancy = async (req, res) => {
  try {
    let body = req.body;
    const jobcollection = await jobpost.create(body);
    res.status(200).json({ message: "Job Post Data Saved Sucsessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Storejob Post Data eroor", success: "true" });
  }
};

const jobvecancylist = async (req, res) => {
  try {
    const allcollection = await jobpost.find();
    res.status(200).json(allcollection);
  } catch (err) {
    console.error("jobvecancylist error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch job vacancies", success: false });
  }
};

const jobvecancysingledata = async (req, res) => {
  try {
    const singbody = req.body;
    // console.log(singbody);
    
    const data = await jobpost.findById(singbody.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updatejobapplicationdata = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    
    const payload = req.body;
    console.log(payload);
    
    await jobpost.findByIdAndUpdate(jobId, payload);
    res
      .status(200)
      .json({ message: "Job vacancy updated successfully", success: true });
  } catch (err) {
    console.error("updatejobapplicationdata error", err);
    res
      .status(500)
      .json({ message: "Failed to update job vacancy", success: false });
  }
};

const deletejobapplicationdata = async (req, res) => {
  try {
    const delbody = req.params.id;
    const delatecollection = await jobpost.findByIdAndDelete(delbody);
    res
      .status(200)
      .json({ message: "Job Vacancy Deleted Successfully!", success: "true" });
  } catch (err) {
    console.error("deletejobapplicationdata error:", err);
    res
      .status(500)
      .json({ message: "Job Vacancy Not Deleted!", success: "false" });
  }
};

export {
  storejobvecancy,
  jobvecancylist,
  jobvecancysingledata,
  updatejobapplicationdata,
  deletejobapplicationdata,
};
