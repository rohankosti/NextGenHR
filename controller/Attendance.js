import Attendance from "../Model/Attandance.js";

const Attendancepost = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    
    const attandancecollection = await Attendance.create(body);
    res.status(200).json({ msg: "Data Stored Sucsesfully" });
  } catch (error) {
    res.status(500).json({ msg: "Data Can't be Stored", error });
  }
};
const GetAttandance = async (req, res) => {
  try {
    const getdata = await Attendance.find();
    res.status(200).json(getdata);
  } catch (error) {
    res.status(500).json({ msg: "Data not find" });
  }
};

const singledata = async (req, res) => {
  try {
    let singlebody = req.body;

    const single = await Attendance.findById(singlebody.id);
    res.status(200).json(single);
  } catch (error) {
    res.status(500).json({ msg: "Data Cant be stored" });
  }
};

const updateddata = async (req, res) => {
  try {
    const upbody = req.body;
    console.log(upbody);
    
    const paylaod = req.params.id;
    const upcollection = await Attendance.findByIdAndUpdate(paylaod, upbody);
    res.status(200).json({ msg: "Data Stored Sucsesfully" });
  } catch (error) {
    res.status(500).json({ msg: "Data Stored Sucsesfully" });
  }
};

const delateddata =async (req, res) => {
  try {
    let delbody = req.params.id
    const delcollection = await Attendance.findByIdAndDelete(delbody);
    res.status(200).json({msg:'Data Sucsesfully Stored'})
  } 
  catch (error) {
    res.status(500).json({msg:'Data Cant Be Stored'})
  }
};
export  {
  Attendancepost,
  GetAttandance,
  singledata,
  updateddata,
  delateddata,
};

