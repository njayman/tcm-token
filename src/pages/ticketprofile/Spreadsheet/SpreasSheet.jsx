import React, { useEffect, useRef, useLayoutEffect } from "react";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";

const SpreadSheet = ({
  sheetData,
  height,
  width,
  toggleRead,
  read,
  options,
}) => {
  const sheetBlock = useRef(null);
  const sheetRef = useRef(null);
  // const sheetContainerRef = useRef(null);
  const [sheetState, setSheetState] = React.useState(sheetData || {});
  // const [read] = useState(false);
  // if (sheetContainerRef?.current) {
  //   console.log(sheetContainerRef.current.offsetHeight);
  // }
  const block = sheetBlock.current;
  useLayoutEffect(() => {
    const sheet = new Spreadsheet("#x-spreadsheet-demo", {
      view: {
        height: () =>
          (block && block.clientHeight) ||
          document.documentElement.clientHeight,
        width: () =>
          (block && block.clientWidth) || document.documentElement.clientWidth,
      },
      ...options,
    })
      .loadData(sheetState) // load data
      .change((data) => {
        setSheetState(data);
        console.log(data);
        // save data to db
      });
    sheetRef.current = sheet;
    return () => {
      if (block?.innerHTML) {
        block.innerHTML = "";
      }
    };
    // eslint-disable-next-line
  }, [read]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <button className="btn btn-secondary my-5" onClick={toggleRead}>
        Toggle mode
      </button>
      <div
        className="my-4"
        id="x-spreadsheet-demo"
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
