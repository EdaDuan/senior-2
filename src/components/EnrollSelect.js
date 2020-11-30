import React, { useState, useRef, useEffect } from "react";
import { EnrollPosition } from "./EnrollPosition";
import "../css/EnrollSelect.css";

function EnrollSelect(props) {
  const {
    placeholder,
    optionList,
    onSetCurrentIndex,
    storeName,
    storeData,
    onsetStoreData,
  } = props;
  // 控制下拉框显示/隐藏
  const [visible, setVisible] = useState(false);
  // 当前选中的值
  const [data, setData] = useState({ value: { placeholder }, label: "" });
  // 当前的input框
  const inputRef = useRef(null);
  useEffect(() => {
    if (
      data.label === "其他" ||
      data.label === "同学推荐" ||
      data.label === "内部推荐"
    ) {
      onSetCurrentIndex(1);
    } else {
      onSetCurrentIndex(0);
    }
    storeName === "getWay"
      ? data.label === "同学推荐" || data.label === "内部推荐"
        ? (storeData[storeName].lable = data.label)
        : (storeData[storeName].value = data.label)
      : (storeData[storeName] = data.label);
  });
  return (
    <>
      <div className="enrollSelect">
        <div className="selectInput">
          <input
            autoComplete="off"
            placeholder={placeholder}
            value={data.label}
            onClick={() => {
              setVisible(true);
            }}
            name="coursename"
            readOnly
            ref={inputRef}
          />
        </div>
        <div className="selectRow">
          <div className="row"></div>
        </div>
      </div>
      {/* 根据visible显示隐藏遮罩层 */}
      {visible ? (
        <EnrollPosition
          onNotVisibleArea={() => setVisible(false)}
          onSetData={(data) => setData(data)}
          targetRef={inputRef}
          optionList={optionList}
        />
      ) : null}
      {/* 当选择其他的时候追加input框 */}
    </>
  );
}
export default EnrollSelect;
