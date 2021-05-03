import React, { useEffect, useRef } from "react";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";
export default function SpreadsheetEditor({ sheetState, setSheetState }) {
  const block = useRef(null);
  useEffect(() => {
    new Spreadsheet(block?.current, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      mode: "edit",
      showToolbar: true,
      showGrid: true,
      showContextmenu: true,
    })
      .loadData(sheetState)
      .change((data) => {
        setSheetState(data);
        // console.log(data);
      });
    let bc = block.current;

    return () => {
      bc.innerHTML = "";
    };
    // eslint-disable-next-line
  }, []);
  return <div ref={block} className="my-2"></div>;
}
