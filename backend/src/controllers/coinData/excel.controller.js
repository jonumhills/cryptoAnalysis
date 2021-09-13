import insert from "../../models/coinData.model.js";
import reader from "xlsx";
const upload = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send("Please uplaod an excel file");
    }

    let path =
      process.cwd() +
      "\\resources\\static\\assets\\uploads\\" +
      req.file.filename;
    let file = reader.readFile(path);
    let coinDatas = [];
    let sheet = file.SheetNames;
    let data = reader.utils.sheet_to_json(file.Sheets[sheet[1]]);

    for (let i in data) {
      //   console.log(i);
      let in_data = [];
      for (let key in data[i]) {
        if (
          key == "Date" ||
          key == "Market" ||
          key == "Price" ||
          key == "Volume" ||
          key == "Total" ||
          key == "Trade" ||
          key == "Fee"
        ) {
          in_data.push(data[i][key]);
        }
      }
      coinDatas.push(in_data);
    }
    insert(coinDatas);
    res.status(200).send({
      message:
        "successfully read the excel and inserted the fields into database",
      sheet_names: sheet,
    });
  } catch (err) {
    res.send({
      message: "failed to read file",
      error: err.message,
    });
  }
};
export default { upload };
