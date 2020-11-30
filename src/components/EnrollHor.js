import React, { useState, useEffect } from "react";
import EnrollInput from "./EnrollInput";
import EnrollSelect from "./EnrollSelect";

import "../css/EnrollHor.css";

export const EnrollHor = (props) => {
  const [neces, setNeces] = useState("");
  // 当前选择的菜单项
  const [currentIndex, setCurrentIndex] = useState(0);
  // 存储输入框中的值
  // const [index, setIndex] = useState(0);
  const {
    necessary,
    name,
    type,
    placehoder,
    optionList,
    inputPlacehoder,
    storeName,
    storeData,
    onsetStoreData,
  } = props;

  useEffect(() => {
    if (necessary === "true") {
      setNeces("*");
    }
  }, [necessary]);
  const formShow = (type) => {
    if (type === "input") {
      console.log(type);
      return (
        <EnrollInput
          placeholder={placehoder}
          storeName={storeName}
          storeData={storeData}
          onsetStoreData={onsetStoreData}
        />
      );
    } else
      return (
        <EnrollSelect
          placeholder={placehoder}
          optionList={optionList}
          onSetCurrentIndex={(currentIndex) => setCurrentIndex(currentIndex)}
          storeName={storeName}
          storeData={storeData}
          onsetStoreData={onsetStoreData}
        />
      );
  };
  // 当选其他的时候出现输入框
  const selectOther = (currentIndex) => {
    if (currentIndex) {
      console.log({ inputPlacehoder });
      console.log({ placehoder });
      return (
        <EnrollInput
          placeholder={inputPlacehoder}
          storeName={storeName}
          storeData={storeData}
          onsetStoreData={onsetStoreData}
        />
      );
    }
  };
  return (
    <div className="hor">
      <div className="enrollHor">
        <div className="formName">
          <span>{neces}</span>
          <div className="name">{name}</div>
        </div>
        <div className="formCon">{formShow(type)}</div>
      </div>
      {currentIndex ? (
        <div className="enrollHor">
          <div className="topLine"></div>
          <div className="formCon">{selectOther(currentIndex)}</div>
        </div>
      ) : null}
    </div>
  );
};
