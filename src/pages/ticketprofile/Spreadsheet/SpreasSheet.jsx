import React, { useEffect, useRef, useState } from "react";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import XLSX from "xlsx";
const SpreadSheet = ({ sheetData, height, width }) => {
  const sheetBlock = useRef(null);
  const [sheetState, setSheetState] = React.useState(sheetData || {});
  const [read, setRead] = useState(true);
  const [file, setFile] = useState([]);
  const filePathset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  };

  const readFile = () => {
    // var name = file.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data); // shows that excel data is read
      setSheetState(convertToJson(data)); // shows data in json format
    };
    reader.readAsBinaryString(file);
  };

  let options = {
    mode: read ? "read" : "edit",
    showToolbar: !read,
    showGrid: !read,
    showContextmenu: !read,
  };
  const block = useRef(null);
  useEffect(() => {
    sheetBlock.current = new Spreadsheet(block.current, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      ...options,
    })
      .loadData(sheetState) // load data
      .change((data) => {
        setSheetState(data);
        console.log(data);
        // save data to db
      });
    let bc = block.current;
    return () => {
      bc.innerHTML = "";
    };
    // eslint-disable-next-line
  }, [read, sheetState]);
  useEffect(() => {
    console.log(file[0]);
  }, [file]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <button
        className="btn btn-secondary my-2"
        onClick={() => setRead((r) => !r)}
      >
        Toggle mode
      </button>
      <input type="file" onChange={filePathset} />
      <button type="button" onClick={readFile} className="btn btn-default">
        Upload File
      </button>
      <div
        ref={block}
        className="my-2"
        style={{
          height: height || "100%",
          width: width || "100%",
          overflow: "auto",
        }}
      ></div>
    </div>
  );
};

export default SpreadSheet;
