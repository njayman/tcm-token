import React, { useEffect, useRef } from "react";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import XLSX from "xlsx";

const SpreadSheet = ({ height, width, readOnly, sampleData }) => {
  const sheetBlock = useRef(null);
  const [sheetState, setSheetState] = React.useState(sampleData || {});

  function stox(wb) {
    var out = [];
    wb.SheetNames.forEach(function (name) {
      var o = { name: name, rows: {} };
      var ws = wb.Sheets[name];
      var aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
      aoa.forEach(function (r, i) {
        var cells = {};
        r.forEach(function (c, j) {
          cells[j] = { text: c };
        });
        o.rows[i] = { cells: cells };
      });
      out.push(o);
    });
    return out;
  }
  const onFileChangeHandler = (e) => {
    let excelFile = e.target.files[0];
    setSheetState(null);
    if (e.target.files[0]) {
      if (!excelFile.name.match(/\.(xlsx|xls|csv|xlsm)$/)) {
        alert("Please Upload Excel File");
      } else {
        const data = new Promise(function (resolve, reject) {
          var reader = new FileReader();
          var rABS = !!reader.readAsBinaryString;
          reader.onload = function (e) {
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            resolve(wb);
          };
          if (rABS) reader.readAsBinaryString(excelFile);
          else reader.readAsArrayBuffer(excelFile);
        });
        data.then((exceldata) => {
          console.log(exceldata);
          let bc = block.current;
          bc.innerHTML = "";
          loadsheet(stox(exceldata));
          // sheetBlock.current.loadData(stox(exceldata));
        });
      }
    }
  };

  const loadsheet = (ss) => {
    sheetBlock.current = new Spreadsheet(block?.current, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      ...options,
    })
      .loadData(ss)
      .change((data) => {
        setSheetState(data);
        console.log(data);
        // save data to db
      });
  };

  let options = {
    mode: "edit",
    showToolbar: true,
    showGrid: true,
    showContextmenu: true,
  };
  const block = useRef(null);
  useEffect(() => {
    let bc = block.current;
    bc.innerHTML = "";
    loadsheet(sheetState);
    // sheetBlock.current // load data

    return () => {
      bc.innerHTML = "";
    };
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   loadsheet(sheetState);
  // }, [sheetState]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <button
        className="btn btn-secondary my-2"
        onClick={() => setRe((r) => !r)}
      >
        Toggle mode
      </button> */}
      <div className="my-3" style={{ width: "300px" }}>
        <div className="custom-file">
          <input
            type="file"
            name="customFile"
            className="custom-file-input"
            onChange={onFileChangeHandler}
          />
          <label className="custom-file-label" for="customFile">
            Choose a spreadsheet file
          </label>
        </div>
      </div>
      <div
        ref={block}
        className="my-2"
        style={{
          height: height || "100%",
          width: width || "100%",
          overflow: "auto",
          pointerEvents: `${readOnly ? "none" : ""}`,
          opacity: `${readOnly ? "0.7" : "1"}`,
        }}
      ></div>
    </div>
  );
};

export default SpreadSheet;
