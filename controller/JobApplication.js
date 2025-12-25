import jobvecancy from '../Model/JobVacancyApplication';

const storejobvecancy = async (req, res) => {
  let body = req.body;
  const jobcollection = await jobvecancy.create(body);
  res.status(200).json({ message: "Job Post Data Saved Sucsessfully" });
};

const jobvecancylist = async (req, res) => {
  const body = req.body;
  const allcollection = await jobvecancy.find();
  res.status(200).json(allcollection);
};

const jobvecancysingledata = async (req, res) => {
  const singlebody = req.params.id;
  const singaldata = await jobvecancy.findById(singlebody);
  res.status(200).json(singaldata);
};

const updatejobapplicationdata = async (req, res) => {
  try {
    const branchId = req.params.id;
    const payload = req.body;
    await jobvecancy.findByIdAndUpdate(branchId, payload);
    res
      .status(200)
      .json({ message: "Branch updated successfully", success: true });
  } catch (err) {
    console.error("updateBranch error", err);
    res
      .status(500)
      .json({ message: "Failed to update branch", success: false });
  }
};

const deletejobapplicationdata = async (req, res) => {
  try {
    const delbody = req.params.id;
    const delatecollection = await jobvecancy.findByIdAndDelete(delbody);
    res.status(200).json({ message: "Job Vacancy Deleted Successfully!" });
  } catch {
    res.status(500).json({ message: "Job Vacancy Not Deleted!" });
  }
};

const jobApplication = {
  storejobvecancy,
  jobvecancylist,
  jobvecancysingledata,
  updatejobapplicationdata,
  deletejobapplicationdata,
};

export default jobApplication;
