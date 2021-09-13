import multer from "multer";

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel files", false);
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${file.originalname}`);
  },
});

let uploadFile = multer({ storage: storage, fileFilter: excelFilter });
export default uploadFile;
